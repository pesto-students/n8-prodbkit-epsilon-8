import axios from 'axios';
import { getURL, getUrlById } from 'shared/utils/api';

import { http } from '../../../http';
import { IMemberData, IMemberPostData, IMemberPutData } from '../member.interface';

export const updateMember = (id: string, data: IMemberPutData) => {
  return http.put(`/member/${id}`, data);
};

export const removeMember = (id: string) => {
  return http.delete(`/member/${id}`);
};

export const fetchMemberList = (id: string) => {
  return axios.get(getUrlById('/member', id), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
    },
  });
};

export const handleMemberDelete = (id: string) => {
  return axios.delete(getUrlById('/member', id), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleMemberSubmit = (formObject: any) => {
  return axios.post(getURL(`/member/${formObject.id}`), formObject.data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export const handleMemberUpdate = (formObject: Record<string, any>) => {
  return axios.put(getUrlById('/member', formObject.id), formObject.data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};
