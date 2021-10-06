import { IAuthState } from '../redux-features/auth';
import { commonState } from '../redux-features/common';

export interface IGlobalState {
  common: commonState;
  auth: IAuthState;
}
