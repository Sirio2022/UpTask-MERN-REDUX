import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/clienteAxios';

const initialState = {
  id: '',
  nombre: '',
  email: '',
  token: '',
  error: '',
  usuario: {},
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload._id;
      state.nombre = action.payload.nombre;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    loginError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
    usuario: (state, action) => {
      state.usuario = action.payload;
    },
  },
});

export const { login, loginError, clearError, loginStart, usuario } =
  loginSlice.actions;

export default loginSlice.reducer;

export const loginAction = (email, password) => async (dispatch) => {
  try {
    const { data } = await clienteAxios.post('/usuarios/login', {
      email,
      password,
    });
    dispatch(login(data));
    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch(
      loginError(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      )
    );
  }
};

export const autenticarUsuario = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const { data } = await clienteAxios.get('/usuarios/perfil', config);
    dispatch(usuario(data));
  } catch (error) {
    dispatch(
      loginError(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      )
    );
  }
};
