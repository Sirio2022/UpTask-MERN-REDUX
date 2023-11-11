import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProyectosAction } from '../redux/proyectosSlice';
import PreviewProyecto from '../components/PreviewProyecto';
import Spinner from '../components/Spinner';

export default function Proyectos() {
  const [loading, setLoading] = useState(false);
  const { proyectos } = useSelector((state) => state.proyectos);


  const dispatch = useDispatch();

  useEffect(() => {
    const obtenerProyectos = async () => {
      setLoading(true);
      await dispatch(obtenerProyectosAction());
      setLoading(false);
    };
    obtenerProyectos();
  }, [dispatch]);

 

  return (
    <>
      <h1 className="text-4xl font-black uppercase">Proyectos</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow mt-10 rounded-lg">
          {proyectos?.length === 0 ? (
            <p className="text-center text-gray-600 uppercase p-5">
              No hay proyectos
            </p>
          ) : (
            <>
              {proyectos?.map((proyecto) => (
                <PreviewProyecto key={proyecto._id} proyecto={proyecto}  />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
