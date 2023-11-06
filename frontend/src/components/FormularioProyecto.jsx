import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { mostrarAlertaAction } from '../redux/proyectosSlice';
import {
  crearProyectoAction,
  actualizarProyectoAction,
} from '../redux/proyectosSlice';

import Alerta from './Alerta';

export default function FormularioProyecto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { alerta, proyecto } = useSelector((state) => state.proyectos);
  const {
    nombre: nombreProyecto,
    descripcion: descripcionProyecto,
    fechaEntrega: fechaEntregaProyecto,
    cliente: clienteProyecto,
  } = proyecto;

  useEffect(() => {
    if (id) {
      setNombre(nombreProyecto);
      setDescripcion(descripcionProyecto);
      setFechaEntrega(fechaEntregaProyecto?.split('T')[0]);
      setCliente(clienteProyecto);
    }
  }, [
    id,
    nombreProyecto,
    descripcionProyecto,
    fechaEntregaProyecto,
    clienteProyecto,
  ]);

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

    if (!id) {
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
          navigate('/proyectos');
        }, 3500);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        dispatch(
          actualizarProyectoAction({
            nombre,
            descripcion,
            fechaEntrega,
            cliente,
            _id: id,
          })
        );
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');
        setTimeout(() => {
          navigate('/proyectos');
        }, 3500);
      } catch (error) {
        console.log(error);
      }
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
        value={id ? 'Editar Proyecto' : 'Crear Proyecto'}
        className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>
  );
}
