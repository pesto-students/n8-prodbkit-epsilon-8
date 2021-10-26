export interface IDatabaseData {
  created: string;
  description: string;
  name: string;
  team_id: string;
  tech_lead: string;
  updated: string;
}

export interface IDatabase {
  data: IDatabaseData[];
}

export interface IDBInfo {
  data: IDatabaseData;
}

export interface IDatabaseState {
  selectedTeamId: string;
  teamList: IDatabaseData[];
}

export type ITeamPostData = Omit<IDatabaseData, 'deletedAt'>;

export type ITeamPutData = Omit<IDatabaseData, 'createdAt' | 'deletedAt'>;
