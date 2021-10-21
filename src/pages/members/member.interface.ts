export interface IMemberData {
  email: string;
  id: string;
  member_id: string;
  name: string;
  role: string;
  username: string | null;
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

export type IMemberPostData = IMemberData;

export type IMemberPutData = Omit<IMemberData, 'createdAt' | 'deletedAt'>;
