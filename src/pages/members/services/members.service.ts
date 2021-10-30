import ApiService from 'shared/api';

export const fetchMemberList = (id: string) => {
  return ApiService.get(`/member/${id}`);
};

export const handleMemberDelete = (id: string) => {
  return ApiService.delete(`/member/${id}`);
};

export const handleMemberSubmit = (formObject: any) => {
  return ApiService.post(`/member/${formObject.id}`, formObject.data);
};
