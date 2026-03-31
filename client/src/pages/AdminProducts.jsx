import { useEffect, useState } from 'react';
import AdminSectionHeader from '../components/layout/AdminSectionHeader.jsx';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchCategories } from '../api/categories.js';
import { createAdminProduct, fetchAdminProducts, updateAdminProduct } from '../api/admin.js';
import { useAuthStore } from '../store/authStore.js';
import { formatPrice } from '../utils/formatPrice.js';
import { getEffectivePrice } from '../utils/getEffectivePrice.js';

const initialForm = {
  category_id: '',
  slug: '',
  name: '',
  description: '',
  price: '',
  discount_price: '',
  image: '',
};

export default function AdminProducts() {
  const { user, accessToken } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      if (!accessToken || user?.role !== 'admin') {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          fetchAdminProducts(accessToken),
          fetchCategories(),
        ]);
        if (active) {
          setProducts(productResponse.data || []);
          setCategories(categoryResponse.data || []);
        }
      } catch (err) {
        if (active) {
          setError('Unable to load admin products.');
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

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEditing(product) {
    setEditingProductId(product.id);
    setForm({
      category_id: String(product.category_id || ''),
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: String(product.price),
      discount_price: String(product.discount_price),
      image: product.image,
    });
    setError('');
  }

  function cancelEditing() {
    setEditingProductId(null);
    setForm(initialForm);
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        ...form,
        category_id: Number(form.category_id),
        price: Number(form.price),
        discount_price: Number(form.discount_price),
      };

      if (editingProductId) {
        await updateAdminProduct(accessToken, editingProductId, payload);
      } else {
        await createAdminProduct(accessToken, payload);
      }

      const refreshed = await fetchAdminProducts(accessToken);
      setProducts(refreshed.data || []);
      cancelEditing();
    } catch (err) {
      setError(editingProductId ? 'Unable to update product.' : 'Unable to create product.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageWrapper>
      <div className="space-y-8">
        <AdminSectionHeader
          title="Products"
          description="Create and refine the assortment visible in the storefront catalog."
        />

        {user?.role === 'admin' && (
          <>
            <form className="grid gap-4 rounded-card border border-border bg-surface-elevated p-6 lg:grid-cols-2" onSubmit={handleSubmit}>
              {error && <p className="lg:col-span-2 text-body-sm text-red-300">{error}</p>}
              <div className="lg:col-span-2 flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.2em] text-brand">
                  {editingProductId ? 'Edit product' : 'Create product'}
                </p>
                {editingProductId && (
                  <button
                    type="button"
                    className="text-xs uppercase tracking-[0.12em] text-ink-secondary"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                )}
              </div>
              <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
                Name
                <input name="name" value={form.name} onChange={handleChange} className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary" required />
              </label>
              <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
                Slug
                <input name="slug" value={form.slug} onChange={handleChange} className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary" required />
              </label>
              <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
                Category
                <select name="category_id" value={form.category_id} onChange={handleChange} className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary" required>
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
                Image URL
                <input name="image" value={form.image} onChange={handleChange} className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary" required />
              </label>
              <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
                Price
                <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary" required />
              </label>
              <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
                Discount price
                <input name="discount_price" type="number" min="0" step="0.01" value={form.discount_price} onChange={handleChange} className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary" required />
              </label>
              <label className="block lg:col-span-2 text-xs uppercase tracking-[0.08em] text-ink-muted">
                Description
                <textarea name="description" value={form.description} onChange={handleChange} className="mt-2 min-h-[120px] w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary" required />
              </label>
              <button type="submit" className="inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 text-xs uppercase tracking-[0.12em] text-ink-invert transition hover:bg-brand-light disabled:opacity-50" disabled={saving}>
                {saving ? 'Saving...' : editingProductId ? 'Update product' : 'Create product'}
              </button>
            </form>

            {loading && <p className="text-body-md text-ink-secondary">Loading products...</p>}
            {!loading && (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col gap-3 rounded-card border border-border bg-surface-elevated p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-display text-lg text-ink-primary">{product.name}</p>
                      <p className="text-body-sm text-ink-muted">{product.category_name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-body-sm text-ink-secondary md:text-right">
                        <p className="font-mono text-ink-primary">{formatPrice(getEffectivePrice(product))}</p>
                        <p>Stock {product.inventory_quantity}</p>
                      </div>
                      <button
                        type="button"
                        className="rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-[0.12em] text-ink-primary transition hover:border-brand hover:text-brand"
                        onClick={() => startEditing(product)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageWrapper>
  );
}
