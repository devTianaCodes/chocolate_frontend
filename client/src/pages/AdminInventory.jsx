import { useEffect, useState } from 'react';
import AdminSectionHeader from '../components/layout/AdminSectionHeader.jsx';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchAdminProducts, updateAdminInventory } from '../api/admin.js';
import { useAuthStore } from '../store/authStore.js';

export default function AdminInventory() {
  const { user, accessToken } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      if (!accessToken || user?.role !== 'admin') {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchAdminProducts(accessToken);
        if (active) {
          setProducts(response.data || []);
        }
      } catch (err) {
        if (active) {
          setError('Unable to load inventory.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [accessToken, user]);

  async function saveInventory(productId) {
    const quantity = Number(drafts[productId]);
    await updateAdminInventory(accessToken, productId, quantity);
    const response = await fetchAdminProducts(accessToken);
    setProducts(response.data || []);
  }

  return (
    <PageWrapper>
      <div className="space-y-8">
        <AdminSectionHeader
          title="Inventory"
          description="Adjust stock levels to keep checkout and catalog availability accurate."
        />

        {error && <p className="text-body-md text-red-300">{error}</p>}
        {loading && <p className="text-body-md text-ink-secondary">Loading inventory...</p>}

        {!loading && user?.role === 'admin' && (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-4 rounded-card border border-border bg-surface-elevated p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-display text-lg text-ink-primary">{product.name}</p>
                  <p className="text-body-sm text-ink-muted">Current stock: {product.inventory_quantity}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    defaultValue={product.inventory_quantity}
                    onChange={(event) => setDrafts((current) => ({ ...current, [product.id]: event.target.value }))}
                    className="w-24 rounded-sm border border-border bg-surface-high px-3 py-2 text-body-sm text-ink-primary"
                  />
                  <button
                    className="rounded-sm bg-brand px-4 py-2 text-xs uppercase tracking-[0.12em] text-ink-invert transition hover:bg-brand-light"
                    onClick={() => saveInventory(product.id)}
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
