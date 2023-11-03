import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Alerta from '../components/Alerta';

export default function ConfirmarCuenta() {
  const [alerta, setAlerta] = useState({});
  const [cuantaConfirmada, setCuentaConfirmada] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        //TODO: Mover hacia un cliente axios
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${id}`
        );
        setAlerta({
          error: false,
          msg: data.msg,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg,
        });
      }
    };
    const timeout = setTimeout(() => {
      confirmarCuenta();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [id]);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a Administrar tus{' '}
        <span className="text-slate-700">Proyectos</span>{' '}
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {cuantaConfirmada && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
}
