import { IMemberState } from 'pages/members/member.interface';
import { IAuthState } from 'redux-features/auth';
import { ICommonState } from 'redux-features/commonDrawer';

export interface IGlobalState {
  common: ICommonState;
  auth: IAuthState;
  member: IMemberState;
}

export type UserAuthType = 'all' | 'admin' | 'team_lead' | 'developer';
