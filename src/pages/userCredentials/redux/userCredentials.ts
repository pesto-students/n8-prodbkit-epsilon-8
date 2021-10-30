import { createSlice } from '@reduxjs/toolkit';

import { IDatabaseState } from '../userCredentials.interface';

const initialState: IDatabaseState = {
  selectedTeamId: '',
  teamList: [],
};

const teamSlice = createSlice({
  name: 'databases',
  initialState,
  reducers: {
    updateTeamList: (state, { payload }) => {
      state.teamList = [...payload];
    },
  },
});

export const { updateTeamList } = teamSlice.actions;
export default teamSlice.reducer;
