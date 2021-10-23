import axios from 'axios';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    console.log(`API Service for ${location.protocol}//${location.host}/api`);

    this.session = axios.create({
      baseURL: `${location.protocol}//${location.host}/api`,
      headers: {
        Content: 'application/json',
      },
    });
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer);
    }

    return this[singleton];
  }

  get = (...params) => this.session.get(...params);
  post = (...params) => this.session.post(...params);
  put = (...params) => this.session.put(...params);
  patch = (...params) => this.session.patch(...params);
  remove = (...params) => this.session.delete(...params);
}

export default ApiService.instance;
