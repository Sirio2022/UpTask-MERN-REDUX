import FormularioProyecto from "../components/FormularioProyecto";

export default function NuevoProyecto() {
  return (
    <>
      <h1 className="text-4xl font-black uppercase">Crear Proyecto</h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
}
