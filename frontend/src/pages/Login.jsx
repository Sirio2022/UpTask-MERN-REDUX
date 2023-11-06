import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alerta from '../components/Alerta';
import { loginAction } from '../redux/loginSlice';
import { autenticarUsuario } from '../redux/perfilSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { usuario, alerta: loginAlerta } = useSelector((state) => state.login);

  useEffect(() => {
    const autenticar = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      await dispatch(autenticarUsuario());
      navigate('/proyectos');
    };

    autenticar();
  }, [dispatch, navigate, usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar
    if ([email, password].includes('')) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios',
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      dispatch(loginAction(email, password));
    } catch (error) {
      console.log('error', error);
    }
  };

  const { msg } = alerta;
  const { msg: loginMsg } = loginAlerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus{' '}
        <span className="text-slate-700">proyectos</span>{' '}
      </h1>

      {msg && <Alerta alerta={alerta} />}
      {loginMsg && <Alerta alerta={loginAlerta} />}

      <form
        className="mt-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email de registro"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Ingresa tu password"
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link
          to="registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          No tienes cuenta? Regístrate
        </Link>

        <Link
          to="olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvidaste tu password?
        </Link>
      </nav>
    </>
  );
}
