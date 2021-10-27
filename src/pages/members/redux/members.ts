import { createSlice } from '@reduxjs/toolkit';

import { IMemberState } from '../member.interface';

const initialState: IMemberState = {
  selectedMemberId: '',
  memberList: [],
};

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateMemberList: (state, { payload }) => {
      state.memberList = [...payload];
    },
  },
});

export const { updateMemberList } = memberSlice.actions;
export default memberSlice.reducer;
