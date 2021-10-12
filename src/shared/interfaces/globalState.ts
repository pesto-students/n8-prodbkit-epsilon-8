import { IAuthState } from '../../redux-features/auth';
import { ICommonState } from '../../redux-features/common';

export interface IGlobalState {
  common: ICommonState;
  auth: IAuthState;
}

export type UserAuthType = 'all' | 'admin' | 'manager' | 'member';
