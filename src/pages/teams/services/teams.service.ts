import { http } from '../../../http';
import { ITeamPostData, ITeamPutData } from '../teams.interface';

export const getAllTeams = () => {
  return http.get('/teams');
};

export const getTeam = (id: string) => {
  return http.get(`/teams/${id}`);
};

export const createTeam = (data: ITeamPostData) => {
  return http.post('/team', data);
};

export const updateTeam = (id: string, data: ITeamPutData) => {
  return http.put(`/team/${id}`, data);
};

export const removeTeam = (id: string) => {
  return http.delete(`/team/${id}`);
};
