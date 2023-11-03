import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

export default function OlvidePassword() {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email === '' || email < 6) {
        setAlerta({
          error: true,
          msg: 'El email es requerido y debe tener al menos 6 caracteres',
        });
        return;
      }

   
      const { data } = await clienteAxios.post(`/usuarios/olvidar-password`, {
        email,
      });

      setAlerta({
        error: false,
        msg: data.msg,
      });
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
        Recupera tu acceso y administra tus{' '}
        <span className="text-slate-700">proyectos</span>{' '}
      </h1>

      {msg && <Alerta alerta={alerta} />}

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

        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>

        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          No tienes cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
}
