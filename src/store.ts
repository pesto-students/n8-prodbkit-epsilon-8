import { configureStore } from '@reduxjs/toolkit';

import authReducer from './redux-features/auth';
import commonReducer from './redux-features/common';

const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
  },
});

export default store;
