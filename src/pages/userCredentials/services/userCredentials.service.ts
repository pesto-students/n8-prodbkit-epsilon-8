import axios from 'axios';
import ApiService from 'shared/api';
import { getURL, getUrlById } from 'shared/utils/api';

export const fetchUserCredentialsList = () => {
  return ApiService.get('/db-credential');
};

export const handleUserCredentialsDelete = (id: string) => {
  return axios.delete(getUrlById('/db', id), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleUserCredentialsSubmit = (formObject: any) => {
  return axios.post(getURL('/db'), formObject, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleUserCredentialsUpdate = (formObject: Record<string, any>) => {
  return axios.put(getUrlById('/db', formObject.id), formObject.data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};
