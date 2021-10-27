import axios from 'axios';
import { getURL, getUrlById } from 'shared/utils/api';

export const fetchTeamsList = () => {
  return axios.get(getURL('/team'), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleTeamDelete = (id: string) => {
  return axios.delete(getUrlById('/team', id), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleTeamSubmit = (formObject: any) => {
  return axios.post(getURL('/team'), formObject, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleTeamUpdate = (formObject: Record<string, any>) => {
  return axios.put(getUrlById('/team', formObject.id), formObject.data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};
