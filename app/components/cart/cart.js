import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import cartStore from '../../store/cart';
import authStore from '../../store/auth';
import { task } from 'ember-concurrency';

// import { jwtDecode } from 'jwt-decode';
// eslint-disable-next-line no-undef

export default class SelectorComponent extends Component {
  @service('cart') cart;
  @service router;

  @tracked items = cartStore.getState().items;
  @tracked history = cartStore.getState().history;
  @tracked hasItems = true;
  @tracked hasHistory = cartStore.getState().history.length ? true : false;
  @tracked total = cartStore.getState().gt;
  @tracked notif = false;
  @tracked notifTitle = '';

  constructor() {
    super(...arguments);
    this.fetchHistory.perform(); // perform the task when the component is created
  }

  get stringCart() {
    return JSON.stringify(this.items);
  }

  @action
  async finalizeOrder() {
    const token = authStore.getState().token;

    const items = cartStore.getState().items;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: token,
    };

    const finalize = await fetch('http://localhost:3000/api/orders/create', {
      headers: headers,
      body: new URLSearchParams({
        items: JSON.stringify(items),
      }),
      method: 'POST',
    });

    const json = await finalize.json();

    if (finalize.ok && json.data.success) {
      cartStore.getState().removeAll();
      cartStore.getState().total();

      // get history
      const history = await fetch('http://localhost:3000/api/orders/list', {
        headers: headers,
        method: 'GET',
      });

      const historyJson = await history.json();

      if (history.ok && historyJson.data.data.length) {
        this.hasHistory = true;
        cartStore.getState().setHistory(historyJson.data.data);
        this.history = cartStore.getState().history;
      }
    } else {
      authStore.getState().setToken(null);
      alert('Please re-login!.');
    }
  }

  @action
  showNotif(title) {
    this.notif = true;
    this.notifTitle = title;
    return setTimeout(() => {
      this.notif = false;
      this.notifTitle = '';
    }, 2000);
  }

  @action
  getSubTotal(id) {
    const sub = cartStore.getState().subTotal(id);
    return sub;
  }

  @action
  checkItems() {
    this.hasItems = this.cart.hasItems;
  }

  @action
  checkHistory() {
    this.hasHistory = this.cart.hasHistory;
  }

  @action
  increment(id) {
    cartStore.getState().increaseCount(id);
    cartStore.getState().subTotal();
    cartStore.getState().total();
    this.items = cartStore.getState().items;
    this.total = cartStore.getState().gt;
  }

  @action
  decrement(id) {
    cartStore.getState().decreaseCount(id);
    cartStore.getState().subTotal();
    cartStore.getState().total();
    this.items = cartStore.getState().items;
    this.total = cartStore.getState().gt;
  }

  @action
  removeAll() {
    cartStore.getState().removeAll();
    cartStore.getState().total();
    this.items = cartStore.getState().items;
    this.total = cartStore.getState().gt;
  }

  @action
  reset() {
    cartStore.getState().reset();
    cartStore.getState().subTotal();
    cartStore.getState().total();
    this.items = cartStore.getState().items;
    this.total = cartStore.getState().gt;
  }

  @task *fetchHistory() {
    const token = authStore.getState().token;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: token,
    };

    const history = yield fetch('http://localhost:3000/api/orders/list', {
      headers: headers,
      method: 'GET',
    });

    const historyJson = yield history.json();

    if (history.ok && historyJson.data.data.length) {
      this.hasHistory = true;
      cartStore.getState().setHistory(historyJson.data.data);
      this.history = cartStore.getState().history;
    } else if (history.ok && !historyJson.data.data.length) {
      this.hasHistory = false;
      cartStore.getState().setHistory(historyJson.data.data);
      this.history = cartStore.getState().history;
    }
  }
}
