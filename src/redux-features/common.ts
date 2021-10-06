import { createSlice } from '@reduxjs/toolkit';

export interface commonState {
  isDrawerVisible: boolean;
  drawerKey: string;
}

const initialState = {
  isDrawerVisible: false,
  drawerKey: '',
} as commonState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showDrawer: (state, { payload }) => {
      state.isDrawerVisible = true;
      state.drawerKey = payload;
      return state;
    },
    hideDrawer: (state) => {
      state.isDrawerVisible = false;
      state.drawerKey = '';
      return state;
    },
  },
});

export const { showDrawer, hideDrawer } = commonSlice.actions;
export default commonSlice.reducer;
