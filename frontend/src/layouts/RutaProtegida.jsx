import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function RutaProtegida() {
  const { usuario } = useSelector((state) => state.perfil);

  return (
    <>
      {usuario._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="flex-1 p-10 ">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
