import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';
import notifStore from '../../store/notif';

export default class NotifWrapperComponent extends Component {
  @tracked notif = notifStore.getState();
  @tracked show = this.notif.show;
  @tracked title = this.notif.title;

  constructor() {
    super(...arguments);
    this.unsubscribe = notifStore.subscribe(() => {
      this.notif = notifStore.getState();
      this.show = this.notif.show;
      this.title = this.notif.title;

      setTimeout(() => {
        this.show = false;
        this.title = '';
      }, 2000);
    });
  }

  get isShow() {
    return this.show;
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.unsubscribe();
  }
}
