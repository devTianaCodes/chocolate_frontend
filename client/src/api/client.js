import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  withCredentials: true,
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
