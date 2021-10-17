export interface IMemberData {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  role: string;
}

export interface IMembers {
  data: IMemberData[];
}

export interface IMemberInfo {
  data: IMemberData;
}

export interface IMemberState {
  selectedMemberId: string;
  memberList: IMemberData[];
}

export type IMemberPostData = Omit<IMemberData, 'deletedAt'>;

export type IMemberPutData = Omit<IMemberData, 'createdAt' | 'deletedAt'>;
