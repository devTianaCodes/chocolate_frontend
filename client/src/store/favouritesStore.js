import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function mapProduct(product) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description || '',
    price: product.price,
    discount_price: product.discount_price,
    image: product.image,
    category_name: product.category_name || 'Chocolate',
    origin: product.origin || '',
  };
}

function hasItem(items, productId) {
  return items.some((item) => item.id === productId);
}

export const useFavouritesStore = create(
  persist(
    (set) => ({
      items: [],

      toggleItem: (product) =>
        set((state) => ({
          items: hasItem(state.items, product.id)
            ? state.items.filter((item) => item.id !== product.id)
            : [mapProduct(product), ...state.items],
        })),

      clearFavourites: () => set({ items: [] }),
    }),
    {
      name: 'choc_favourites',
    }
  )
);
