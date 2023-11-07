import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { obtenerProyectoAction } from '../redux/proyectosSlice';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useSelector } from 'react-redux';
import FormularioProyecto from '../components/FormularioProyecto';
import { eliminarProyectoAction } from '../redux/proyectosSlice';
import Alerta from '../components/Alerta';

export default function EditarProyecto() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { proyecto, alerta } = useSelector((state) => state.proyectos);
  const { nombre } = proyecto;

  useEffect(() => {
    dispatch(obtenerProyectoAction(id));
  }, [dispatch, id]);

  const handleClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no se podrá recuperar el proyecto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarProyectoAction(id));
        navigate('/proyectos');
        Swal.fire('Eliminado', 'El proyecto ha sido eliminado', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El proyecto no se ha eliminado', 'error');
      }
    });
  };

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black uppercase text-4xl">
          Editar Proyecto: {nombre}
        </h1>

        {msg && <Alerta alerta={alerta} />}

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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>

          <button className="uppercase font-bold" onClick={handleClick}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
}
