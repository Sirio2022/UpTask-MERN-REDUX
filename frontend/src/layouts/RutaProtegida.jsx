import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function RutaProtegida() {
  const { usuario } = useSelector((state) => state.perfil);

  return <>{usuario._id ? <Outlet /> : <Navigate to="/" />}</>;
}
