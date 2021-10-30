import axios from 'axios';
import { getURL } from 'shared/utils/api';

export const submitManualLogin = (userValues: any) => {
  return axios.post(getURL('/auth/login'), userValues);
};

export const submitGoogleLogin = (userValues: any) => {
  return axios.post(getURL('/auth/loginViaGoogle'), userValues);
};
