import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './redux/loginSlice';
import perfilReducer from './redux/perfilSlice';

const store = configureStore({
  reducer: {
    // Add reducers here
    login: loginReducer,
    perfil: perfilReducer,
  },
});

export default store;
