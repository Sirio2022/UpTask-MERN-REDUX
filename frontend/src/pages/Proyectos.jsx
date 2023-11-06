import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  obtenerProyectosAction,
  mostrarAlertaAction,
  clearError,
} from '../redux/proyectosSlice';
import PreviewProyecto from '../components/PreviewProyecto';
import Alerta from '../components/Alerta';

export default function Proyectos() {
  const { proyectos, error, alerta } = useSelector((state) => state.proyectos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerProyectosAction());

    if (error) {
      dispatch(mostrarAlertaAction({ error: true, msg: error }));
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-4xl font-black uppercase">Proyectos</h1>

      {msg && <Alerta alerta={alerta} />}

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
