import { create } from 'zustand';
import { fetchCart, addCartItem, updateCartItem, removeCartItem } from '../api/cart.js';
import { useAuthStore } from './authStore.js';

function getSessionId() {
  let id = localStorage.getItem('choc_session');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('choc_session', id);
  }
  return id;
}

export const useCartStore = create((set, get) => ({
  items: [],
  loading: false,
  error: '',
  sessionId: typeof window !== 'undefined' ? getSessionId() : null,
  isCartDrawerOpen: false,
  lastAddedItem: null,
  lastAddedQuantity: 0,

  loadCart: async () => {
    set({ loading: true, error: '' });
    try {
      const token = useAuthStore.getState().accessToken;
      const data = await fetchCart({ sessionId: get().sessionId, token });
      set({ items: data.data.items || [] });
    } catch (err) {
      set({ error: 'Unable to load cart.' });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productInput, quantity = 1, options = {}) => {
    set({ loading: true, error: '' });
    try {
      const token = useAuthStore.getState().accessToken;
      const productId = typeof productInput === 'object' ? productInput.id : productInput;
      const fallbackProduct = typeof productInput === 'object' ? productInput : null;
      const data = await addCartItem({ sessionId: get().sessionId, productId, quantity }, token);
      const items = data.data.items || [];
      const addedItem = items.find((item) => Number(item.product_id) === Number(productId));

      set({
        items,
        isCartDrawerOpen: Boolean(options.openDrawer),
        lastAddedItem: addedItem || fallbackProduct,
        lastAddedQuantity: Number(quantity || 1),
      });
      return true;
    } catch (err) {
      set({ error: 'Unable to add item.' });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateItem: async (itemId, quantity) => {
    set({ loading: true, error: '' });
    try {
      const token = useAuthStore.getState().accessToken;
      const data = await updateCartItem(itemId, { quantity, sessionId: get().sessionId }, token);
      set({ items: data.data.items || [] });
    } catch (err) {
      set({ error: 'Unable to update item.' });
    } finally {
      set({ loading: false });
    }
  },

  removeItem: async (itemId) => {
    set({ loading: true, error: '' });
    try {
      const token = useAuthStore.getState().accessToken;
      const data = await removeCartItem(itemId, { sessionId: get().sessionId, token });
      set({ items: data.data.items || [] });
    } catch (err) {
      set({ error: 'Unable to remove item.' });
    } finally {
      set({ loading: false });
    }
  },

  emptyCart: async () => {
    set({ loading: true, error: '' });
    try {
      const token = useAuthStore.getState().accessToken;
      const sessionId = get().sessionId;
      const removals = get().items.map((item) =>
        removeCartItem(item.id, { sessionId, token })
      );
      await Promise.all(removals);
      set({ items: [], isCartDrawerOpen: false, lastAddedItem: null, lastAddedQuantity: 0 });
    } catch (err) {
      set({ error: 'Unable to empty cart.' });
    } finally {
      set({ loading: false });
    }
  },

  clearItems: () => {
    set({ items: [], isCartDrawerOpen: false, lastAddedItem: null, lastAddedQuantity: 0 });
  },

  closeCartDrawer: () => {
    set({ isCartDrawerOpen: false });
  },
}));
