import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/clienteAxios';

const initialState = {
  usuario: localStorage.getItem('perfil')
    ? JSON.parse(localStorage.getItem('perfil'))
    : {},
  error: '',
};

const perfilSlice = createSlice({
  name: 'perfil',
  initialState,
  reducers: {
    usuario: (state, action) => {
      state.usuario = action.payload;
    },
    authError: (state, action) => {
      state.error = action.payload;
    },
    clearPerfilError: (state) => {
      state.error = '';
    },
  },
});

export const { usuario, authError, clearError } = perfilSlice.actions;

export default perfilSlice.reducer;

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
    localStorage.setItem('perfil', JSON.stringify(data));
  } catch (error) {
    dispatch(
      authError(
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
      )
    );
  }
};
