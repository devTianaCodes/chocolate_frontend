import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:3001/api';
const MISSING_API_URL_MESSAGE =
  'VITE_API_URL must be configured for the deployed Chocolate Craft House frontend.';

function resolveApiUrl() {
  const configuredApiUrl = import.meta.env.VITE_API_URL;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isLocalApiUrl =
    configuredApiUrl?.includes('localhost') || configuredApiUrl?.includes('127.0.0.1');

  if (configuredApiUrl && (!isLocalApiUrl || isLocalHost)) {
    return configuredApiUrl;
  }

  if (isLocalHost) {
    return LOCAL_API_URL;
  }

  return '';
}

const API_URL = resolveApiUrl();

const api = axios.create({
  baseURL: API_URL || '/__missing_api_url__',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (!API_URL) {
    return Promise.reject(new Error(MISSING_API_URL_MESSAGE));
  }

  return config;
});

let interceptorCleanup = null;

export function installAuthInterceptor({ getAccessToken, refreshSession, clearSession }) {
  if (interceptorCleanup) {
    interceptorCleanup();
  }

  let refreshPromise = null;

  const responseInterceptor = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if (!originalRequest || originalRequest._retry || status !== 401) {
        return Promise.reject(error);
      }

      // Avoid recursive refresh attempts on auth endpoints.
      if (
        originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/auth/demo-login') ||
        originalRequest.url?.includes('/auth/register') ||
        originalRequest.url?.includes('/auth/refresh') ||
        originalRequest.url?.includes('/auth/logout')
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshSession().finally(() => {
            refreshPromise = null;
          });
        }

        const accessToken = await refreshPromise;
        originalRequest.headers = {
          ...(originalRequest.headers || {}),
        };

        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          delete originalRequest.headers.Authorization;
        }

        return api(originalRequest);
      } catch (refreshError) {
        await clearSession();
        return Promise.reject(refreshError);
      }
    }
  );

  const requestInterceptor = api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  });

  interceptorCleanup = () => {
    api.interceptors.request.eject(requestInterceptor);
    api.interceptors.response.eject(responseInterceptor);
    interceptorCleanup = null;
  };

  return interceptorCleanup;
}

export default api;
