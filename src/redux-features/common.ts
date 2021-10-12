import { createSlice } from '@reduxjs/toolkit';

import { modalTitleMap } from '../shared/constants';

export interface ICommonState {
  isDrawerVisible: boolean;
  drawerTitle: string;

  isModalVisible: boolean;
  modalTitle: string;
  modalText: string;
}

const initialState = {
  isDrawerVisible: false,
  drawerTitle: '',

  isModalVisible: false,
  modalTitle: '',
  modalText: '',
} as ICommonState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showDrawer: (state, { payload }) => {
      state.isDrawerVisible = true;
      state.drawerTitle = payload;
      return state;
    },
    hideDrawer: (state) => {
      state.isDrawerVisible = false;
      state.drawerTitle = '';
      return state;
    },
    showModal: (state, { payload }: { payload: Record<string, string> }) => {
      state.isModalVisible = true;
      state.modalTitle = modalTitleMap[payload.key];
      state.modalText = payload.text;
      return state;
    },
    hideModal: (state) => {
      state.isModalVisible = false;
      state.modalTitle = '';
      return state;
    },
  },
});

export const { showDrawer, hideDrawer, showModal, hideModal } = commonSlice.actions;
export default commonSlice.reducer;
