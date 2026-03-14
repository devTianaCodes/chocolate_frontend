import { create } from 'zustand';
import { fetchCart, addCartItem, updateCartItem, removeCartItem } from '../api/cart.js';

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

  loadCart: async () => {
    set({ loading: true, error: '' });
    try {
      const data = await fetchCart({ sessionId: get().sessionId });
      set({ items: data.data.items || [] });
    } catch (err) {
      set({ error: 'Unable to load cart.' });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productId, quantity = 1) => {
    set({ loading: true, error: '' });
    try {
      const data = await addCartItem({ sessionId: get().sessionId, productId, quantity });
      set({ items: data.data.items || [] });
    } catch (err) {
      set({ error: 'Unable to add item.' });
    } finally {
      set({ loading: false });
    }
  },

  updateItem: async (itemId, quantity) => {
    set({ loading: true, error: '' });
    try {
      const data = await updateCartItem(itemId, { quantity });
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
      const data = await removeCartItem(itemId);
      set({ items: data.data.items || [] });
    } catch (err) {
      set({ error: 'Unable to remove item.' });
    } finally {
      set({ loading: false });
    }
  },
}));
