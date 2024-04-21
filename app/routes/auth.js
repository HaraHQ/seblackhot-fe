import Route from '@ember/routing/route';

export default class AuthRoute extends Route {
  constructor() {
    super(...arguments);
    this.active = 'login';
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('active', this.active);
  }
}
