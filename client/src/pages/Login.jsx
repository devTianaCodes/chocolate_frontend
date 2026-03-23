import { useMemo, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { useAuthStore } from '../store/authStore.js';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register, loading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirectTo = location.state?.from || '/account';
  const isRegisterMode = useMemo(
    () => searchParams.get('mode') === 'register',
    [searchParams]
  );

  function setMode(mode) {
    setSearchParams(mode === 'register' ? { mode } : {});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const action = isRegisterMode ? register : login;
    const success = await action(email, password);
    if (success) {
      navigate(redirectTo, { replace: true });
    }
  }

  return (
    <PageWrapper>
      <div className="panel-wash-strong mx-auto max-w-md space-y-5 p-6 md:p-8">
        <header className="space-y-2">
          <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">
            {isRegisterMode ? 'New membership' : 'Account access'}
          </p>
          <h1 className="text-panel-ink font-display text-display-sm">
            {isRegisterMode ? 'Create account' : 'Sign in'}
          </h1>
          <p className="text-panel-secondary text-body-sm">
            {isRegisterMode
              ? 'Join for faster checkout and order tracking.'
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

        {error && <p className="text-body-sm text-[#8c3f37]">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="text-panel-secondary block text-xs uppercase tracking-[0.08em]">
            Email
            <input
              type="email"
              className="glass-input mt-3 rounded-none border-[rgba(125,82,71,0.24)] bg-[rgba(255,251,248,0.96)] text-[rgb(var(--color-panel-ink))]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="text-panel-secondary block text-xs uppercase tracking-[0.08em]">
            Password
            <input
              type="password"
              className="glass-input mt-3 rounded-none border-[rgba(125,82,71,0.24)] bg-[rgba(255,251,248,0.96)] text-[rgb(var(--color-panel-ink))]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="button-primary mt-6 w-full"
            disabled={loading}
          >
            {loading ? (isRegisterMode ? 'Creating…' : 'Signing in…') : isRegisterMode ? 'Create account' : 'Sign in'}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
