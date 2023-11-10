import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerProyectoAction } from '../redux/proyectosSlice';
import FormularioColaborador from '../components/FormularioColaborador';
import { useDispatch, useSelector } from 'react-redux';

export default function NuevoColaborador() {
  
  const { id } = useParams();

  const { proyecto } = useSelector((state) => state.proyectos);
  const dispatch = useDispatch();

  useEffect(() => {
    const obtenerProyecto = async () => {
      await dispatch(obtenerProyectoAction(id));
    };
    obtenerProyecto();
  }, [id, dispatch]);

  return (
    <>
      <h1 className="text-4xl font-black">Agregar Colaborador(a) en: </h1>
      <h2 className="text-4xl font-black">Proyecto: {proyecto.nombre}</h2>

      <div className="flex justify-center mt-10">
        <FormularioColaborador />
      </div>
    </>
  );
}
