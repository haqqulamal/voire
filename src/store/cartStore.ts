import { create } from 'zustand';
import type { CartItem } from '../types/index';

interface CartState {
  items: CartItem[];
  count: number;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const getCount = (items: CartItem[]) => items.reduce((total, item) => total + item.quantity, 0);

export const useCartStore = create<CartState>((set) => ({
  items: [],
  count: 0,
  setItems: (items) => set({ items, count: getCount(items) }),
  addItem: (item) => set((state) => {
    const existing = state.items.find((cartItem) => cartItem.id === item.id);
    const items = existing
      ? state.items.map((cartItem) => (cartItem.id === item.id ? item : cartItem))
      : [...state.items, item];

    return { items, count: getCount(items) };
  }),
  removeItem: (id) => set((state) => {
    const items = state.items.filter((item) => item.id !== id);

    return { items, count: getCount(items) };
  }),
  clearCart: () => set({ items: [], count: 0 }),
}));
