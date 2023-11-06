import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export default function PreviewProyecto({ proyecto }) {
  const { nombre, _id, cliente } = proyecto;
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {nombre}
        <span className="text-gray-500 font-bold text-sm"> - {cliente}</span>
      </p>

      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase font-bold"
      >
        Ver Proyecto
      </Link>
    </div>
  );
}

PreviewProyecto.propTypes = {
  proyecto: PropTypes.object.isRequired,
};
