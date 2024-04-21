import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import cartStore from '../store/cart';
import authStore from '../store/auth';
import notifStore from '../store/notif';

export default class SelectorComponent extends Component {
  constructor() {
    super(...arguments);
    this.unsubscribe = authStore.subscribe(() => {
      this.auth = authStore.getState();
      this.token = this.auth.token;
    });
    this.unsubscribeNotif = notifStore.subscribe(() => {
      this.notif = notifStore.getState();
      this.show = this.notif.show;
      this.title = this.notif.title;
    });
    this.fetchMenus.perform(); // perform the task when the component is created
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.unsubscribe();
    this.unsubscribeNotif();
  }

  @tracked auth = authStore.getState();
  @tracked token = this.auth.token;
  @tracked menus = []; // initialize menus as an empty array

  @tracked notif = notifStore.getState();
  @tracked show = this.notif.show;
  @tracked title = this.notif.title;

  get isLogin() {
    return this.token === null ? false : true;
  }

  get stringMenus() {
    return JSON.stringify(this.menus);
  }

  @task *fetchMenus() {
    const response = yield fetch('http://localhost:3000/api/menus');
    const json = yield response.json();
    this.menus = json || [];
  }

  @action
  addToCart(item) {
    const payload = {
      ...item,
      count: 1,
    };
    cartStore.getState().addItem(payload);
    cartStore.getState().subTotal();
    cartStore.getState().total();

    notifStore.getState().update({
      show: true,
      title: item.name,
    });
  }
}
