export interface ITeamsData {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  role: string;
}

export interface ITeams {
  data: ITeamsData[];
}

export interface ITeamInfo {
  data: ITeamsData;
}

export interface ITeamState {
  selectedTeamId: string;
  teamList: ITeamsData[];
}

export type ITeamPostData = Omit<ITeamsData, 'deletedAt'>;

export type ITeamPutData = Omit<ITeamsData, 'createdAt' | 'deletedAt'>;
