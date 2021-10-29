import axios from 'axios';
import { getURL, getUrlById } from 'shared/utils/api';

export const fetchDatabaseList = () => {
  return axios.get(getURL('/db'), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleDatabaseDelete = (id: string) => {
  return axios.delete(getUrlById('/db', id), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleDatabaseSubmit = (formObject: any) => {
  return axios.post(getURL('/db'), formObject, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleDatabaseUpdate = (formObject: Record<string, any>) => {
  return axios.put(getUrlById('/db', formObject.id), formObject.data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};
