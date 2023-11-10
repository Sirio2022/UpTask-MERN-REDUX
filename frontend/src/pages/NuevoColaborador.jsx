import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  obtenerProyectoAction,
  agregarColaboradorAction,
} from '../redux/proyectosSlice';
import FormularioColaborador from '../components/FormularioColaborador';
import { useDispatch, useSelector } from 'react-redux';
import Alerta from '../components/Alerta';

export default function NuevoColaborador() {
  const { id } = useParams();

  const { proyecto, colaborador } = useSelector((state) => state.proyectos);
  const { email } = colaborador;

  const dispatch = useDispatch();

  useEffect(() => {
    const obtenerProyecto = async () => {
      await dispatch(obtenerProyectoAction(id));
    };
    obtenerProyecto();
  }, [id, dispatch]);

  if (!proyecto?._id) {
    return <Alerta alerta={{ msg: 'Proyecto no encontrado' }} />;
  }

  return (
    <>
      <h1 className="text-4xl font-black">Agregar Colaborador(a) en: </h1>
      <h2 className="text-4xl font-black"> {proyecto.nombre}</h2>

      <div className="flex justify-center mt-10">
        <FormularioColaborador />
      </div>

      {colaborador?.nombre ? (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-lg">
            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
            <div className="flex justify-between items-center">
              <p>{colaborador.nombre}</p>

              <button
                type="button"
                className="bg-slate-500 px-5 py-2 rounded-lg text-white text-sm font-bold uppercase hover:bg-slate-600"
                onClick={() => dispatch(agregarColaboradorAction(email))}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
