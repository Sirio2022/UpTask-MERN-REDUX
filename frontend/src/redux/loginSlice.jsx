import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../config/clienteAxios';

const initialState = {
  usuario: {},
  alerta: {},
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.usuario = action.payload;
    },
    loginAlerta: (state, action) => {
      state.alerta = action.payload;
    },
  },
});

export const { login, loginAlerta } = loginSlice.actions;

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
      loginAlerta({
        msg:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
        error: true,
      })
    );
  }
  setTimeout(() => {
    dispatch(loginAlerta({}));
  }, 3000);
};
