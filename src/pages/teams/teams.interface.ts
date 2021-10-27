export interface ITeamsData {
  created: string;
  description: string;
  name: string;
  team_id: string;
  tech_lead: string;
  updated: string;
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
