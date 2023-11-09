import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { handleModalEditarTareaAction } from '../redux/proyectosSlice';

import { formatearFecha } from '../helpers/formatearFecha';

export default function Tarea({ tarea }) {
  const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea;

  const dispatch = useDispatch();

  return (
    <div
      key={tarea._id}
      className="border-b p-5 flex justify-between items-center"
    >
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="text-xl">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600">
          {' '}
          <span className="uppercase font-bold text-gray-600">
            Prioridad:
          </span>{' '}
          {prioridad}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="bg-red-600 text-white font-bold text-sm px-4 py-3 rounded-lg uppercase"
          onClick={() => dispatch(handleModalEditarTareaAction(tarea))}
        >
          Editar
        </button>
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
        <button
          type="button"
          className="bg-indigo-600 text-white font-bold text-sm px-4 py-3 rounded-lg uppercase"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

Tarea.propTypes = {
  tarea: PropTypes.object.isRequired,
};
