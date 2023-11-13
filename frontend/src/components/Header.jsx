import { Link } from 'react-router-dom';
import Busqueda from './Busqueda';
import { mostrarModalBuscadorProyectosAction } from '../redux/proyectosSlice';
import { useDispatch } from 'react-redux';

export default function Header() {

  const dispatch = useDispatch();

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
          >
            Cerrar Sesión
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
}
