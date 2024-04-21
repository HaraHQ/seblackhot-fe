import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import cartStore from '../store/cart';
import authStore from '../store/auth';

export default class SelectorComponent extends Component {
  @service router;

  constructor() {
    super(...arguments);
    this.unsubscribe = cartStore.subscribe(() => {
      this.cart = cartStore.getState();
      this.cartCount = this.count;
    });
    this.unsubscribeAuth = authStore.subscribe(() => {
      this.auth = authStore.getState();
      this.token = this.auth.token;
    });
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.unsubscribe(); // unsubscribe when the component is unmounted
    this.unsubscribeAuth();
  }

  get count() {
    let total = 0;
    this.cart.items.map((item) => (total += item.count));
    return total;
  }

  @tracked cart = cartStore.getState(); // get initial state
  @tracked auth = authStore.getState(); // get initial state
  @tracked cartCount = this.count;
  @tracked token = this.auth.token;

  @action
  logout() {
    this.auth.resetToken();
    this.token = this.auth.token;
    this.router.transitionTo('index');
  }
}
