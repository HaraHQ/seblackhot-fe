import { createStore } from 'zustand/vanilla';

const notifStore = createStore((set) => ({
  show: false,
  title: '',
  update: ({ show, title }) => set({ show, title }),
}));

export default notifStore;
