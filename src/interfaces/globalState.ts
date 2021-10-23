import { IAuthState } from '../redux-features/auth';
import { ICommonState } from '../redux-features/commonDrawer';

export interface IGlobalState {
  common: ICommonState;
  auth: IAuthState;
}
