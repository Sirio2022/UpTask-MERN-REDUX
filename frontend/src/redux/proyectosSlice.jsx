import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/clienteAxios';

const initialState = {
  proyectos: [],
  proyecto: {},
  alerta: {},
  modalFormularioTarea: false,
};

const proyectosSlice = createSlice({
  name: 'proyectos',
  initialState,
  reducers: {
    obtenerProyectos: (state, action) => {
      state.proyectos = action.payload;
    },
    crearProyecto: (state, action) => {
      state.proyectos = [...state.proyectos, action.payload];
    },

    obtenerProyecto: (state, action) => {
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
    mostrarAlerta: (state, action) => {
      state.alerta = action.payload;
    },
    mostrarModalFormularioTarea: (state, action) => {
      state.modalFormularioTarea = action.payload;
    },
    crearTarea: (state, action) => {
      state.proyecto = {
        ...state.proyecto,
        tareas: [...state.proyecto.tareas, action.payload],
      };
    },
  },
});

export const {
  obtenerProyectos,
  obtenerProyecto,
  crearProyecto,
  eliminarProyecto,
  actualizarProyecto,
  mostrarAlerta,
  mostrarModalFormularioTarea,
  crearTarea,
} = proyectosSlice.actions;

export default proyectosSlice.reducer;

export const mostrarAlertaAction = (alerta) => (dispatch) => {
  dispatch(mostrarAlerta(alerta));
  setTimeout(() => {
    dispatch(mostrarAlerta({}));
  }, 5000);
};

export const mostrarModalFormularioTareaAction = () => (dispatch) => {
  dispatch(mostrarModalFormularioTarea());
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
    dispatch(crearProyecto(data.proyecto));
    dispatch(
      mostrarAlertaAction({
        msg: data.msg,
        error: false,
      })
    );
  } catch (error) {
    dispatch(
      mostrarAlertaAction({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
};

export const obtenerProyectosAction = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const { data } = await clienteAxios.get('/proyectos', config);
    dispatch(obtenerProyectos(data));
  } catch (error) {
    dispatch(
      mostrarAlertaAction({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
};

export const obtenerProyectoAction = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const { data } = await clienteAxios.get(`/proyectos/${id}`, config);

    dispatch(obtenerProyecto(data));
  } catch (error) {
    dispatch(
      mostrarAlertaAction({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
};

export const actualizarProyectoAction = (proyecto) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const { data } = await clienteAxios.put(
      `/proyectos/${proyecto._id}`,
      proyecto,
      config
    );
    dispatch(actualizarProyecto(data));
    dispatch(
      mostrarAlertaAction({
        msg: data.msg,
        error: false,
      })
    );
  } catch (error) {
    dispatch(
      mostrarAlertaAction({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
};

export const eliminarProyectoAction = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
    dispatch(eliminarProyecto(id));
    dispatch(
      mostrarAlertaAction({
        msg: data.msg,
        error: false,
      })
    );
  } catch (error) {
    dispatch(
      mostrarAlertaAction({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
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

    dispatch(crearTarea(data.tarea));
    dispatch(
      mostrarAlertaAction({
        msg: data.msg,
        error: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      mostrarAlertaAction({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
};
