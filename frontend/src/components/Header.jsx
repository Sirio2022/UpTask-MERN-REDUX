import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Busqueda from './Busqueda';
import { mostrarModalBuscadorProyectosAction } from '../redux/proyectosSlice';
import { cerrarSesionPerfilAction } from '../redux/perfilSlice';
import { cerrarSesionLoginAction } from '../redux/loginSlice';
import { cerrarSesionProyectosAction } from '../redux/proyectosSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCerrarSesion = () => {
    dispatch(cerrarSesionPerfilAction());
    dispatch(cerrarSesionLoginAction());
    dispatch(cerrarSesionProyectosAction());
    navigate('/');
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex justify-between">
        <Link to="/proyectos">
          <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
            UpTask
          </h2>
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={() => dispatch(mostrarModalBuscadorProyectosAction())}
          >
            Buscar Proyecto
          </button>

          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            type="button"
            className="bg-sky-500 p-3 rounded-lg text-white font-bold uppercase text-sm"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
}
