import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { useAuthStore } from '../store/authStore.js';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirectTo = location.state?.from || '/account';

  async function handleSubmit(event) {
    event.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate(redirectTo, { replace: true });
    }
  }

  return (
    <PageWrapper>
      <div className="glass-panel-strong mx-auto max-w-md space-y-6 p-6 md:p-8">
        <header className="space-y-2">
          <p className="section-label">Account access</p>
          <h1 className="font-display text-display-sm text-ink-primary">Sign in</h1>
          <p className="text-body-sm text-ink-secondary">Access your account and orders.</p>
        </header>

        {error && <p className="text-body-sm text-red-300">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
            Email
            <input
              type="email"
              className="glass-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
            Password
            <input
              type="password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="button-primary w-full"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-body-sm text-ink-secondary">
          New here?{' '}
          <Link className="text-brand" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}
