import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { useAuthStore } from '../store/authStore.js';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await login(email, password);
    navigate('/account');
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-md space-y-6">
        <header>
          <h1 className="font-display text-display-sm text-ink-primary">Sign in</h1>
          <p className="text-body-sm text-ink-secondary">Access your account and orders.</p>
        </header>

        {error && <p className="text-body-sm text-red-300">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
            Email
            <input
              type="email"
              className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
            Password
            <input
              type="password"
              className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-sm bg-brand px-6 py-3 text-xs uppercase tracking-[0.12em] text-ink-invert transition hover:bg-brand-light"
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
