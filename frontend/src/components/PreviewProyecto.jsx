import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function PreviewProyecto({ proyecto }) {
  const { usuario } = useSelector((state) => state.perfil);
  const { nombre, _id, cliente, creador } = proyecto;

  return (
    <div className="border-b p-5 flex justify-between">
      <div className="flex flex-col lg:flex-row items-start gap-2 ">
        <p className="flex-1">
          {nombre}
          <span className="text-gray-500 font-bold text-sm">
            {' '}
            - Cliente: {cliente}
          </span>
        </p>

        {usuario._id !== creador && (
          <p className="p-1 bg-green-500 text-xs rounded-xl text-white font-bold uppercase">
            Colaborador
          </p>
        )}
      </div>

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
