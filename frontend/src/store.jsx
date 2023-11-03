import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './redux/login';

const store = configureStore({
  reducer: {
    // Add reducers here
    login: loginReducer,
  },
});

export default store;
