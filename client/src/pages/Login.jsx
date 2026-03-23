import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { useAuthStore } from '../store/authStore.js';

const LOGIN_DEFAULTS = {
  email: '',
  password: '',
};

const REGISTER_DEFAULTS = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register, loading, error, clearError } = useAuthStore();
  const [loginForm, setLoginForm] = useState(LOGIN_DEFAULTS);
  const [registerForm, setRegisterForm] = useState(REGISTER_DEFAULTS);
  const [localError, setLocalError] = useState('');
  const redirectTo = location.state?.from || '/account';
  const isRegisterMode = useMemo(
    () => searchParams.get('mode') === 'register',
    [searchParams]
  );

  function setMode(mode) {
    setLocalError('');
    clearError();
    setSearchParams(mode === 'register' ? { mode } : {});
  }

  function updateLoginField(field, value) {
    setLoginForm((current) => ({ ...current, [field]: value }));
  }

  function updateRegisterField(field, value) {
    setRegisterForm((current) => ({ ...current, [field]: value }));
  }

  function validateLoginForm() {
    if (!loginForm.email.trim() || !loginForm.password) {
      return 'Email and password required.';
    }

    return '';
  }

  function validateRegisterForm() {
    const requiredFields = [
      ['firstName', 'First name required.'],
      ['lastName', 'Last name required.'],
      ['email', 'Email required.'],
      ['password', 'Password required.'],
      ['line1', 'Address line 1 required.'],
      ['city', 'City required.'],
      ['state', 'State / Region required.'],
      ['postalCode', 'Postal code required.'],
      ['country', 'Country required.'],
    ];

    const missingField = requiredFields.find(([field]) => !registerForm[field].trim());
    if (missingField) {
      return missingField[1];
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email);
    if (!emailOk) {
      return 'Enter a valid email.';
    }

    if (registerForm.password.length < 8) {
      return 'Password must be at least 8 characters.';
    }

    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextError = isRegisterMode ? validateRegisterForm() : validateLoginForm();
    if (nextError) {
      setLocalError(nextError);
      return;
    }

    setLocalError('');

    const success = isRegisterMode
      ? await register({
          firstName: registerForm.firstName.trim(),
          lastName: registerForm.lastName.trim(),
          email: registerForm.email.trim(),
          password: registerForm.password,
          phone: registerForm.phone.trim(),
          shippingAddress: {
            line1: registerForm.line1.trim(),
            line2: registerForm.line2.trim(),
            city: registerForm.city.trim(),
            state: registerForm.state.trim(),
            postalCode: registerForm.postalCode.trim(),
            country: registerForm.country.trim(),
          },
        })
      : await login(loginForm.email.trim(), loginForm.password);

    if (success) {
      navigate(redirectTo, { replace: true });
    }
  }

  const visibleError = localError || error;

  return (
    <PageWrapper>
      <div className="panel-wash-strong mx-auto max-w-3xl space-y-5 p-6 md:p-8">
        <header className="space-y-2">
          <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">
            {isRegisterMode ? 'New membership' : 'Account access'}
          </p>
          <h1 className="text-panel-ink font-display text-display-sm">
            {isRegisterMode ? 'Create account' : 'Sign in'}
          </h1>
          <p className="text-panel-secondary text-body-sm">
            {isRegisterMode
              ? 'Create your account with one default shipping address for faster checkout.'
              : 'Access your account and orders.'}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={isRegisterMode ? 'button-ghost w-full' : 'button-primary w-full'}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={isRegisterMode ? 'button-primary w-full' : 'button-ghost w-full'}
            onClick={() => setMode('register')}
          >
            New member
          </button>
        </div>

        {visibleError && <p className="text-body-sm text-[#8c3f37]">{visibleError}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {isRegisterMode ? (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField label="First name">
                  <input
                    type="text"
                    className="auth-input"
                    value={registerForm.firstName}
                    onChange={(e) => updateRegisterField('firstName', e.target.value)}
                    required
                  />
                </FormField>
                <FormField label="Last name">
                  <input
                    type="text"
                    className="auth-input"
                    value={registerForm.lastName}
                    onChange={(e) => updateRegisterField('lastName', e.target.value)}
                    required
                  />
                </FormField>
              </div>

              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_220px]">
                <FormField label="Email">
                  <input
                    type="email"
                    className="auth-input"
                    value={registerForm.email}
                    onChange={(e) => updateRegisterField('email', e.target.value)}
                    required
                  />
                </FormField>
                <FormField label="Phone (optional)">
                  <input
                    type="tel"
                    className="auth-input"
                    value={registerForm.phone}
                    onChange={(e) => updateRegisterField('phone', e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Password">
                <input
                  type="password"
                  className="auth-input"
                  value={registerForm.password}
                  onChange={(e) => updateRegisterField('password', e.target.value)}
                  required
                />
              </FormField>

              <div className="space-y-5 border-t border-[rgba(125,82,71,0.18)] pt-5">
                <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">
                  Default shipping address
                </p>

                <FormField label="Address line 1">
                  <input
                    type="text"
                    className="auth-input"
                    value={registerForm.line1}
                    onChange={(e) => updateRegisterField('line1', e.target.value)}
                    required
                  />
                </FormField>

                <FormField label="Address line 2 (optional)">
                  <input
                    type="text"
                    className="auth-input"
                    value={registerForm.line2}
                    onChange={(e) => updateRegisterField('line2', e.target.value)}
                  />
                </FormField>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField label="City">
                    <input
                      type="text"
                      className="auth-input"
                      value={registerForm.city}
                      onChange={(e) => updateRegisterField('city', e.target.value)}
                      required
                    />
                  </FormField>
                  <FormField label="State / Region">
                    <input
                      type="text"
                      className="auth-input"
                      value={registerForm.state}
                      onChange={(e) => updateRegisterField('state', e.target.value)}
                      required
                    />
                  </FormField>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField label="Postal code">
                    <input
                      type="text"
                      className="auth-input"
                      value={registerForm.postalCode}
                      onChange={(e) => updateRegisterField('postalCode', e.target.value)}
                      required
                    />
                  </FormField>
                  <FormField label="Country">
                    <input
                      type="text"
                      className="auth-input"
                      value={registerForm.country}
                      onChange={(e) => updateRegisterField('country', e.target.value)}
                      required
                    />
                  </FormField>
                </div>
              </div>
            </>
          ) : (
            <>
              <FormField label="Email">
                <input
                  type="email"
                  className="auth-input"
                  value={loginForm.email}
                  onChange={(e) => updateLoginField('email', e.target.value)}
                  required
                />
              </FormField>
              <FormField label="Password">
                <input
                  type="password"
                  className="auth-input"
                  value={loginForm.password}
                  onChange={(e) => updateLoginField('password', e.target.value)}
                  required
                />
              </FormField>
            </>
          )}

          <button
            type="submit"
            className="button-primary w-full"
            disabled={loading}
          >
            {loading ? (isRegisterMode ? 'Creating…' : 'Signing in…') : isRegisterMode ? 'Create account' : 'Sign in'}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}

function FormField({ label, children }) {
  return (
    <label className="text-panel-secondary block text-xs uppercase tracking-[0.08em]">
      {label}
      {children}
    </label>
  );
}
