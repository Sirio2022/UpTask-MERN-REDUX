import { useState } from 'react';
import Spinner from './Spinner';

import {
  mostrarAlertaAction,
  agregarColaboradorAction,
} from '../redux/proyectosSlice';
import Alerta from './Alerta';
import { useDispatch, useSelector } from 'react-redux';

export default function FormularioColaborador() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { alerta } = useSelector((state) => state.proyectos);

  const dispatch = useDispatch();

  const handleSubmmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      dispatch(
        mostrarAlertaAction({
          error: true,
          msg: 'Todos los campos son obligatorios',
        })
      );

      return;
    }
    setLoading(true);
    await dispatch(agregarColaboradorAction(email));
    setLoading(false);
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg- shadow-lg"
      onSubmit={handleSubmmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email del Colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email del Colaborador"
          className="w-full p-2 mt-2 border rounded-lg outline-none focus:border-sky-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Buscar Colaborador"
        className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
      {loading && <Spinner />}
    </form>
  );
}
