import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import {
  mostrarModalFormularioTarea,
  mostrarAlertaAction,
  crearTareaAction,
} from '../redux/proyectosSlice';

import Alerta from './Alerta';

const PRIORIDAD = ['alta', 'media', 'baja'];

const ModalFormularioTarea = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [prioridad, setPrioridad] = useState('');

  const { modalFormularioTarea, alerta, proyecto, tarea } = useSelector(
    (state) => state.proyectos
  );

  const { _id, nombre: nombreProyecto } = proyecto;

  const dispatch = useDispatch();

  useEffect(() => {
    setNombre(tarea.nombre);
    setDescripcion(tarea.descripcion);
    setFechaEntrega(tarea.fechaEntrega);
    setPrioridad(tarea.prioridad);
  }, [tarea]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
      dispatch(
        mostrarAlertaAction({
          msg: 'Todos los campos son obligatorios',
          error: true,
        })
      );
      return;
    }

    dispatch(
      crearTareaAction({
        nombre,
        descripcion,
        fechaEntrega,
        prioridad,
        proyecto: _id,
      })
    );
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setPrioridad('');
    setTimeout(() => {
      dispatch(mostrarModalFormularioTarea(false));
    }, 3000);
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => dispatch(mostrarModalFormularioTarea(false))}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => dispatch(mostrarModalFormularioTarea(false))}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Crear Tarea en: {`${nombreProyecto}`}
                  </Dialog.Title>
                  {msg && <Alerta alerta={alerta} />}

                  <form className="my-10" onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                      >
                        Nombre Tarea
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 mb-5 text-sm text-gray-900"
                        placeholder="Nombre Tarea"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="descripcion"
                        className="text-gray-700 uppercase font-bold"
                      >
                        Descripción
                      </label>
                      <textarea
                        name="descripcion"
                        id="descripcion"
                        className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 mb-5 text-sm text-gray-900"
                        placeholder="Descripción Tarea"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="fecha-entrega"
                        className="text-gray-700 uppercase font-bold"
                      >
                        Fecha de Entrega
                      </label>
                      <input
                        type="date"
                        name="fecha-entrega"
                        id="fecha-entrega"
                        className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 mb-5 text-sm text-gray-900"
                        value={fechaEntrega}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="prioridad"
                        className="text-gray-700 uppercase font-bold"
                      >
                        Prioridad
                      </label>
                      <select
                        name="prioridad"
                        id="prioridad"
                        className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 mb-5 text-sm text-gray-900"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <option value="">-- Seleccione --</option>
                        {PRIORIDAD.map((prioridad) => (
                          <option key={prioridad}>{prioridad}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="submit"
                      className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                      value="Crear Tarea"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioTarea;
