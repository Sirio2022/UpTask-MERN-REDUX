import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { obtenerProyectoAction } from '../redux/proyectosSlice';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import FormularioProyecto from '../components/FormularioProyecto';

export default function EditarProyecto() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { proyecto } = useSelector((state) => state.proyectos);
  const { nombre, descripcion, fechaEntrega, cliente } = proyecto;

  useEffect(() => {
    dispatch(obtenerProyectoAction(id));
  }, [dispatch, id]);

  return (
    <>
      <h1 className="font-black uppercase text-4xl">
        Editar Proyecto: {nombre}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
}
