import { configureStore } from '@reduxjs/toolkit';
import memberReducer from 'pages/members/redux/members';
import authReducer from 'redux-features/auth';
import commonReducer from 'redux-features/common';

const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    member: memberReducer,
  },
});

export default store;
