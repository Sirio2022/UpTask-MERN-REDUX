import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/clienteAxios';

const initialState = {
  tareas: [],
  tarea: {},
  tareaCreada: {},
  tareaActualizada: {},
  alertaTarea: {},
};

const tareasSlice = createSlice({
  name: 'tareas',
  initialState,
  reducers: {
    obtenerTareas: (state, action) => {
      state.tareas = action.payload;
    },
    crearTarea: (state, action) => {
      state.tareaCreada = action.payload;
    },
    obtenerTarea: (state, action) => {
      state.tarea = action.payload;
    },
    eliminarTarea: (state, action) => {
      state.tareas = state.tareas.filter(
        (tarea) => tarea._id !== action.payload
      );
    },
    actualizarTarea: (state, action) => {
      state.tareas = state.tareas.map((tarea) =>
        tarea._id === action.payload._id ? action.payload : tarea
      );
      state.tareaActualizada = action.payload;
    },
    mostrarAlerta: (state, action) => {
      state.alertaTarea = action.payload;
    },
  },
});

export const {
  obtenerTareas,
  obtenerTarea,
  crearTarea,
  eliminarTarea,
  actualizarTarea,
  mostrarAlerta,
} = tareasSlice.actions;

export default tareasSlice.reducer;

export const mostrarAlertaActionTarea = (alerta) => (dispatch) => {
  dispatch(mostrarAlerta(alerta));
  setTimeout(() => {
    dispatch(mostrarAlerta({}));
  }, 5000);
};

export const crearTareaAction = (tarea) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const { data } = await clienteAxios.post('/tareas', tarea, config);
    dispatch(crearTarea(data));
    dispatch(mostrarAlertaActionTarea({ msg: data.msg, error: false }));
  } catch (error) {
    console.log(error);
    dispatch(
      mostrarAlertaActionTarea({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
};
