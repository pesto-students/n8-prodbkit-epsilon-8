import { createSlice } from '@reduxjs/toolkit';

import { UserAuthType } from '../shared/interfaces/globalState';

export interface IAuthState {
  isUserLoggedin: boolean;
  loggedinUserRole: UserAuthType;
  userDetails?: any;
}

const initialState: IAuthState = {
  isUserLoggedin: true,
  loggedinUserRole: 'admin',
  userDetails: {
    name: 'saurav arora',
  },
};

const authSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isUserLoggedin = true;
      return state;
    },
    logoutUser: (state) => {
      state.isUserLoggedin = false;
      return state;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
