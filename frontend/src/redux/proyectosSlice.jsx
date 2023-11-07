import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/clienteAxios';

const initialState = {
  proyectos: [],
  proyecto: {},
  proyectoCreado: {},
  proyectoActualizado: {},
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
      state.proyectoCreado = action.payload;
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
      state.proyectoActualizado = action.payload;
    },

    mostrarAlerta: (state, action) => {
      state.alerta = action.payload;
    },
  },
});

export const {
  obtenerProyectos,
  obtenerProyecto,
  crearProyecto,
  eliminarProyecto,
  actualizarProyecto,
  proyectoError,
  mostrarAlerta,
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
    dispatch(crearProyecto(data.proyecto));
    dispatch(
      mostrarAlerta({
        msg: data.msg,
        error: false,
      })
    );
  } catch (error) {
    dispatch(
      mostrarAlerta({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
  setTimeout(() => {
    dispatch(mostrarAlerta({}));
  }, 3000);
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
      mostrarAlerta({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
  setTimeout(() => {
    dispatch(mostrarAlerta({}));
  }, 3000);
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
      mostrarAlerta({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
  setTimeout(() => {
    dispatch(mostrarAlerta({}));
  }, 3000);
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
      mostrarAlerta({
        msg: data.msg,
        error: false,
      })
    );
  } catch (error) {
    dispatch(
      mostrarAlerta({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
  setTimeout(() => {
    dispatch(mostrarAlerta({}));
  }, 3000);
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
      mostrarAlerta({
        msg: data.msg,
        error: false,
      })
    );
  } catch (error) {
    dispatch(
      mostrarAlerta({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
  setTimeout(() => {
    dispatch(mostrarAlerta({}));
  }, 3000);
};
