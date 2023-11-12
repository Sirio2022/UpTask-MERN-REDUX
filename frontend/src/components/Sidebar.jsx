import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const { usuario } = useSelector((state) => state.perfil);

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hola: {usuario.nombre}</p>
      <Link
        to="crear-proyecto"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
}
