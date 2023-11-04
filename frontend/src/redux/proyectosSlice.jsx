import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/clienteAxios';

const initialState = {
  proyectos: [],
  proyecto: {},
  error: '',
  alerta: {},
};

const proyectosSlice = createSlice({
  name: 'proyectos',
  initialState,
  reducers: {
    obtenerProyectos: (state, action) => {
      state.proyectos = action.payload;
    },
    crearProyecto: (state, action) => {
      state.proyecto = action.payload;
    },
    eliminarProyecto: (state, action) => {
      state.proyectos = state.proyectos.filter(
        (proyecto) => proyecto._id !== action.payload
      );
    },
    actualizarProyecto: (state, action) => {
      state.proyectos = state.proyectos.map((proyecto) =>
        proyecto._id === action.payload._id ? action.payload : proyecto
      );
    },
    proyectoError: (state, action) => {
      state.error = action.payload;
    },
    mostrarAlerta: (state, action) => {
      state.alerta = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
});

export const {
  obtenerProyectos,
  crearProyecto,
  eliminarProyecto,
  actualizarProyecto,
  proyectoError,
  mostrarAlerta,
  clearError,
} = proyectosSlice.actions;

export default proyectosSlice.reducer;

export const mostrarAlertaAction = (alerta) => (dispatch) => {
  dispatch(mostrarAlerta(alerta));
  setTimeout(() => {
    dispatch(mostrarAlerta({}));
  }, 5000);
};

export const crearProyectoAction = (proyecto) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const { data } = await clienteAxios.post('/proyectos', proyecto, config);
    dispatch(crearProyecto(data));
    dispatch(
      mostrarAlertaAction({
        msg: 'Proyecto creado correctamente',
        error: false,
      })
    );
    setTimeout(() => {
      dispatch(mostrarAlerta({}));
    }, 3000);
  } catch (error) {
    dispatch(
      proyectoError(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      )
    );
  }
};
