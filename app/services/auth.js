import Service from '@ember/service';
import authStore from '../store/auth';

export default class ZustandService extends Service {
  get token() {
    return authStore.getState().token;
  }

  setToken(token) {
    authStore.getState().setToken(token);
  }

  resetToken() {
    authStore.getState().resetToken();
  }
}
