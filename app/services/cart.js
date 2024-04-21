import Service from '@ember/service';
import cartStore from '../store/cart';

export default class ZustandService extends Service {
  get items() {
    return cartStore.getState().items;
  }

  get history() {
    return cartStore.getState().history;
  }

  get hasItems() {
    return cartStore.getState().items.length > 0;
  }

  get hasHistory() {
    return cartStore.getState().history.length > 0;
  }

  addItem(item) {
    cartStore.getState().addItem(item);
  }

  removeItem(id) {
    cartStore.getState().removeItem(id);
  }

  increaseCount(id) {
    cartStore.getState().increaseCount(id);
  }

  decreaseCount(id) {
    cartStore.getState().decreaseCount(id);
  }
}
