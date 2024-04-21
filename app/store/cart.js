import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

const cartStore = createStore(
  persist(
    (set, get) => ({
      items: [
        {
          id: 1,
          name: 'Seblack Blackpool',
          count: 5,
          price: 10000,
          st: 50000,
        },
        {
          id: 2,
          name: 'Seblack Liuerpool',
          count: 5,
          price: 15000,
          st: 75000,
        },
        {
          id: 3,
          name: 'Seblack Setan Menchretster',
          count: 5,
          price: 20000,
          st: 100000,
        },
      ],
      history: [],
      gt: 225000,
      setHistory: (history) => set({ history }),
      addItem: (item) => {
        if (get().items.find((i) => i.id === item.id)) {
          set((state) => ({
            items: state.items.map((i) => {
              if (i.id === item.id) {
                return { ...i, count: i.count + 1 };
              }
              return i;
            }),
          }));
        } else {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      increaseCount: (id) => {
        set({
          items: get().items.map((item) => {
            if (item.id === id) {
              return { ...item, count: item.count + 1 };
            }
            return item;
          }),
        });
      },
      decreaseCount: (id) => {
        const item = get().items.find((item) => item.id === id);

        if (item.count === 1) {
          const items = get().items.filter((item) => item.id !== id);
          set({ items });
        } else {
          set({
            items: get().items.map((item) => {
              if (item.id === id) {
                return { ...item, count: item.count - 1 };
              }
              return item;
            }),
          });
        }
      },
      subTotal: () => {
        set((state) => ({
          items: state.items.map((item) => {
            return { ...item, st: item.count * item.price };
          }),
        }));
      },
      total: () => {
        let totall = 0;
        get().items.map((item) => {
          totall += item.st;
        });
        set({ gt: totall });
      },
      removeAll: () => {
        set({ items: [] });
      },
      reset: () => {
        set({
          items: [
            {
              id: 1,
              name: 'Seblack Blackpool',
              count: 5,
              price: 10000,
              st: 50000,
            },
            {
              id: 2,
              name: 'Seblack Liuerpool',
              count: 5,
              price: 15000,
              st: 75000,
            },
            {
              id: 3,
              name: 'Seblack Setan Menchretster',
              count: 5,
              price: 20000,
              st: 100000,
            },
          ],
        });
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
);

export default cartStore;
