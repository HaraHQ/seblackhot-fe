import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SelectorComponent extends Component {
  @service router;
  @service('auth') auth;

  @tracked active = 'login';
  @tracked email = '';
  @tracked password = '';
  @tracked message = '';
  @tracked isFailed = false;

  @action
  setToken(token) {
    this.auth.setToken(token);
  }

  @action
  setLogin() {
    this.active = 'login';
  }

  @action
  setRegister() {
    this.active = 'register';
  }

  @action
  setEmail(event) {
    this.email = event.target.value;
  }

  @action
  setPassword(event) {
    this.password = event.target.value;
  }

  @action
  async login() {
    this.message = '';
    this.isFailed = false;

    const login = await fetch('http://localhost:3000/api/customers/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        email: this.email,
        password: this.password,
      }),
    });
    const result = await login.json();

    if (result.data.token) {
      this.auth.setToken(result.data.token);
      this.router.transitionTo('index');

      // console.log(result.data.token);
      // console.log('zustand token', this.auth.token);
    } else {
      this.auth.setToken(null);
      this.isFailed = true;
      this.message = result.data.message;
    }
  }
}
