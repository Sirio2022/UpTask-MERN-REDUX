import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mostrarAlertaAction } from '../redux/proyectosSlice';
import { crearProyectoAction, clearError } from '../redux/proyectosSlice';

import Alerta from './Alerta';

export default function FormularioProyecto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { alerta, error } = useSelector((state) => state.proyectos);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      dispatch(
        mostrarAlertaAction({
          error: true,
          msg: 'Todos los campos son obligatorios',
        })
      );

      return;
    }

    if (error) {
      dispatch(
        mostrarAlertaAction({
          error: true,
          msg: error,
        })
      );
    }

    try {
      dispatch(
        crearProyectoAction({
          nombre,
          descripcion,
          fechaEntrega,
          cliente,
        })
      );
      setNombre('');
      setDescripcion('');
      setFechaEntrega('');
      setCliente('');
      setTimeout(() => {
        dispatch(clearError());
        navigate('/proyectos');
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow "
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre del Proyecto
        </label>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre del Proyecto"
          className="w-full p-2 mt-2 border rounded-lg outline-none focus:border-sky-500"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripción del Proyecto
        </label>
        <textarea
          id="descripcion"
          placeholder="Descripción del Proyecto"
          className="w-full p-2 mt-2 border rounded-lg outline-none focus:border-sky-500"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="fecha-entrega"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha de Entrega
        </label>
        <input
          type="date"
          id="fecha-entrega"
          className="w-full p-2 mt-2 border rounded-lg outline-none focus:border-sky-500"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Cliente
        </label>
        <input
          type="text"
          id="cliente"
          placeholder="Cliente"
          className="w-full p-2 mt-2 border rounded-lg outline-none focus:border-sky-500"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Crear Proyecto"
        className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>
  );
}
