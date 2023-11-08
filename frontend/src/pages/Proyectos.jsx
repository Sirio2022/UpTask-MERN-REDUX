import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProyectosAction } from '../redux/proyectosSlice';
import PreviewProyecto from '../components/PreviewProyecto';

export default function Proyectos() {
  const { proyectos } = useSelector((state) => state.proyectos);

  const dispatch = useDispatch();

  useEffect(() => {
    const obtenerProyectos = async () => {
      await dispatch(obtenerProyectosAction());
    };
    obtenerProyectos();
  }, [dispatch]);

  return (
    <>
      <h1 className="text-4xl font-black uppercase">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length === 0 ? (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay proyectos
          </p>
        ) : (
          <>
            {proyectos.map((proyecto) => (
              <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
