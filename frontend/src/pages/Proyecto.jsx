import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { obtenerProyectoAction } from '../redux/proyectosSlice';
import Spinner from '../components/Spinner';

import ModalFormularioTarea from '../components/ModalFormularioTarea';
import { mostrarModalFormularioTareaAction } from '../redux/proyectosSlice';
import Tarea from '../components/Tarea';

export default function Proyecto() {
  const [loading, setLoading] = useState(false);

  const { proyecto } = useSelector((state) => state.proyectos);

  const { nombre } = proyecto;

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const obtenerProyecto = async () => {
      setLoading(true);
      await dispatch(obtenerProyectoAction(id));

      setLoading(false);
    };
    obtenerProyecto();
  }, [id, dispatch]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="font-black uppercase text-4xl">{nombre}</h1>

            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>

              <Link
                to={`/proyectos/editar/${id}`}
                className="uppercase font-bold"
              >
                Editar
              </Link>
            </div>
          </div>
          <button
            onClick={() => dispatch(mostrarModalFormularioTareaAction())}
            type="button"
            className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Nueva Tarea
          </button>

          <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

          <div className="bg-white shadow-xl mt-10 rounded-lg">
            {proyecto.tareas?.length === 0 ? (
              <p className="text-center text-gray-400 py-5">No hay tareas</p>
            ) : (
              proyecto.tareas?.map((tarea) => (
                <Tarea key={tarea._id} tarea={tarea} />
              ))
            )}
          </div>

          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl">Colaboradores</p>
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>

              <Link
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className="uppercase font-bold "
              >
                Añadir
              </Link>
            </div>
          </div>

          <ModalFormularioTarea />
        </>
      )}
    </div>
  );
}
