import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

export default function NuevoPassword() {
  const { token } = useParams();

  const [tokenValido, setTokenValido] = useState(false);
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/api/usuarios/olvidar-password/${token}`);

        setTokenValido(true);
      } catch (error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg,
        });
      }
    };
    const timeout = setTimeout(() => {
      comprobarToken();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password === '' || password < 6) {
        setAlerta({
          error: true,
          msg: 'El password es requerido y debe tener al menos 6 caracteres',
        });
        return;
      }

      const { data } = await clienteAxios.post(
        `/usuarios/olvidar-password/${token}`,
        { password }
      );

      setAlerta({
        error: false,
        msg: data.msg,
      });
      setPasswordModificado(true);
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
        Reestablece tu password y accede a tu{' '}
        <span className="text-slate-700">cuenta</span>{' '}
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="mt-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="nuevo-password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo Pasword
            </label>
            <input
              type="password"
              placeholder="Ingresa tu nuevo password"
              id="nuevo-password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Nuevo password"
            className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
}
