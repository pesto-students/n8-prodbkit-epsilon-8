import axios from 'axios';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    console.log(`API Service for ${process.env.REACT_APP_BASE_URL}`);

    this.session = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
        'Content-Type': 'application/json',
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
  delete = (...params) => this.session.delete(...params);
}

export default ApiService.instance;
