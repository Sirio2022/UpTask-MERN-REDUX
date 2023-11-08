import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './redux/loginSlice';
import perfilReducer from './redux/perfilSlice';
import proyectosReducer from './redux/proyectosSlice';
import tareasReducer from './redux/tareasSlice';

const store = configureStore({
  reducer: {
    // Add reducers here
    login: loginReducer,
    perfil: perfilReducer,
    proyectos: proyectosReducer,
    tareas: tareasReducer,
  },
});

export default store;
