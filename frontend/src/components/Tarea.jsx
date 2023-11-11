import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import {
  handleModalEditarTareaAction,
  eliminarTareaAction,
} from '../redux/proyectosSlice';

import { formatearFecha } from '../helpers/formatearFecha';

import Swal from 'sweetalert2';

export default function Tarea({ tarea, accesoAutorizado }) {
  const { nombre, descripcion, prioridad, fechaEntrega, estado } = tarea;

  const dispatch = useDispatch();

  const handleClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no se podrá recuperar la tarea',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarTareaAction(tarea._id));
        Swal.fire(
          'Eliminada',
          'La tarea ha sido eliminada correctamente!',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La tarea no se ha eliminado', 'error');
      }
    });
  };

  return (
    <div
      key={tarea._id}
      className="border-b p-5 flex justify-between items-center"
    >
      <div>
        <p className="text-xl uppercase">Tarea: {nombre}</p>
        <p className="text-sm text-gray-500 uppercase">
          Descripción: {descripcion}
        </p>
        <p className="text-sm">
          <span className="font-bold uppercase">Fecha de entrega:</span>{' '}
          {formatearFecha(fechaEntrega)}
        </p>
        <p className="text-gray-600">
          {' '}
          <span className="uppercase font-bold text-gray-600">
            Prioridad:
          </span>{' '}
          {prioridad}
        </p>
      </div>

      <div className="flex gap-2">
        {accesoAutorizado() && (
          <button
            type="button"
            className="bg-red-600 text-white font-bold text-sm px-4 py-3 rounded-lg uppercase"
            onClick={() => dispatch(handleModalEditarTareaAction(tarea))}
          >
            Editar
          </button>
        )}
        {estado ? (
          <button
            type="button"
            className="bg-sky-600 text-white font-bold text-sm px-4 py-3 rounded-lg uppercase"
          >
            completa
          </button>
        ) : (
          <button
            type="button"
            className="bg-gray-600 text-white font-bold text-sm px-4 py-3 rounded-lg uppercase"
          >
            Incompleta
          </button>
        )}
        {accesoAutorizado() && (
          <button
            type="button"
            className="bg-indigo-600 text-white font-bold text-sm px-4 py-3 rounded-lg uppercase"
            onClick={handleClick}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

Tarea.propTypes = {
  tarea: PropTypes.object.isRequired,
  accesoAutorizado: PropTypes.func.isRequired,
};
