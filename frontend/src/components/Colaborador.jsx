import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { eliminarColaboradorAction } from '../redux/proyectosSlice';
import Swal from 'sweetalert2';

export default function Colaborador({ colaborador }) {
  const { nombre, email, _id } = colaborador;

  const dispatch = useDispatch();

  const handleClick = () => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Un colaborador eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarColaboradorAction(_id));
        Swal.fire(
          'Eliminado',
          'El colaborador ha sido eliminado correctamente',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El colaborador no se ha eliminado', 'error');
      }
    });
  };

  return (
    <div className="border-b p-5 flex justify-between">
      <div>
        <p className="font-bold">{nombre}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-red-500 px-5 py-2 rounded-lg text-white text-sm font-bold uppercase hover:bg-red-600"
          onClick={handleClick}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

Colaborador.propTypes = {
  colaborador: PropTypes.object.isRequired,
};
