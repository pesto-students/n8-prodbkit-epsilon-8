import { http } from '../../../http';
import { IMemberData, IMemberPostData, IMemberPutData } from '../member.interface';

export const getAllMembers = () => {
  return http.get('/members');
};

export const getMember = (id: string) => {
  return http.get(`/members/${id}`);
};

export const createMember = (data: IMemberPostData) => {
  return http.post('/member', data);
};

export const updateMember = (id: string, data: IMemberPutData) => {
  return http.put(`/member/${id}`, data);
};

export const removeMember = (id: string) => {
  return http.delete(`/member/${id}`);
};
