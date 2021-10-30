import ApiService from 'shared/api';

export const fetchTeamsList = () => {
  return ApiService.get('/team');
};

export const handleTeamDelete = (id: string) => {
  return ApiService.delete(`/team/${id}`);
};

export const handleTeamSubmit = (formObject: any) => {
  return ApiService.post('/team', formObject);
};

export const handleTeamUpdate = (formObject: Record<string, any>) => {
  return ApiService.put(`/team/${formObject.id}`, formObject.data);
};
