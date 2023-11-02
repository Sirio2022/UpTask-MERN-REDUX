import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import axios from 'axios';

export default function Registrar() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios',
      });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({
        error: true,
        msg: 'Las contraseñas no coinciden',
      });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        error: true,
        msg: 'El password debe tener al menos 6 caracteres',
      });
      return;
    }

    setAlerta({});

    //Registrar usuario
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
        {
          nombre,
          email,
          password,
        }
      );

      setAlerta({
        error: false,
        msg: data.msg,
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{' '}
        <span className="text-slate-700">proyectos</span>{' '}
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="mt-10 bg-white shadow rounded-lg p-10"
        onSubmit={submitHandler}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre de registro"
            id="nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label
            htmlFor="repetir-password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            repetir password
          </label>
          <input
            type="password"
            placeholder="Repite tu password"
            id="repetir-password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya posees una cuenta? Inicia sesión
        </Link>

        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvidaste tu password?
        </Link>
      </nav>
    </>
  );
}
