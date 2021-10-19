import { createSlice } from '@reduxjs/toolkit';

import { ITeamState } from '../teams.interface';

const initialState: ITeamState = {
  selectedTeamId: '',
  teamList: [],
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    updateTeamList: (state, { payload }) => {
      state.teamList = [...payload];
    },
  },
});

export const { updateTeamList } = teamSlice.actions;
export default teamSlice.reducer;
