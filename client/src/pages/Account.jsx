import PageWrapper from '../components/layout/PageWrapper.jsx';
import { useAuthStore } from '../store/authStore.js';

export default function Account() {
  const { user, logout, loading } = useAuthStore();

  return (
    <PageWrapper>
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-display-md text-ink-primary">Account</h1>
        </header>

        {!user && (
          <p className="text-body-md text-ink-secondary">
            You are not signed in.
          </p>
        )}

        {user && (
          <div className="rounded-card border border-border bg-surface-elevated p-6">
            <p className="text-body-sm text-ink-secondary">Signed in as</p>
            <p className="font-display text-display-sm text-ink-primary">{user.email}</p>
            <p className="text-body-sm text-ink-muted">Role: {user.role}</p>
            <button
              className="mt-4 rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-[0.1em] text-ink-secondary"
              onClick={logout}
              disabled={loading}
            >
              {loading ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
