import ApiService from 'shared/api';

export const submitManualLogin = (userValues: any) => {
  return ApiService.post('/auth/login', userValues);
};

export const submitGoogleLogin = (userValues: any) => {
  return ApiService.post('/auth/loginViaGoogle', userValues);
};
