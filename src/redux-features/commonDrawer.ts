import { createSlice } from '@reduxjs/toolkit';
import { modalTitleMap } from 'shared/components/organisms/drawer/drawer.constants';

export interface ICommonState {
  isDrawerVisible: boolean;
  drawerTitle: string;
  id: string | undefined;

  isModalVisible: boolean;
  modalTitle: string;
  modalText: string;
}

const initialState = {
  isDrawerVisible: false,
  drawerTitle: '',
  id: undefined,

  isModalVisible: false,
  modalTitle: '',
  modalText: '',
} as ICommonState;

const commonDrawerSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showDrawer: (state, { payload }: { payload: Record<string, string> }) => {
      state.isDrawerVisible = true;
      state.drawerTitle = payload.key;
      state.id = payload.id;
      return state;
    },
    hideDrawer: (state) => {
      state.isDrawerVisible = false;
      state.drawerTitle = '';
      state.id = undefined;
      return state;
    },
    showModal: (state, { payload }: { payload: Record<string, string> }) => {
      state.isModalVisible = true;
      state.modalTitle = modalTitleMap[payload.key];
      state.modalText = payload.text;
      state.id = payload.id;
      return state;
    },
    hideModal: (state) => {
      state.isModalVisible = false;
      state.modalTitle = '';
      state.id = undefined;
      return state;
    },
  },
});

export const { showDrawer, hideDrawer, showModal, hideModal } = commonDrawerSlice.actions;
export default commonDrawerSlice.reducer;
