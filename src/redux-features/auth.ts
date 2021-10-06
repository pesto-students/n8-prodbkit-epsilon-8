import { createSlice } from '@reduxjs/toolkit';

export interface IAuthState {
  value: number;
}

const initialState = { value: 0 };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // to-do
    // authenticateUser(state) {},
  },
});

// export const { authenticateUser } = authSlice.actions;
export default authSlice.reducer;
