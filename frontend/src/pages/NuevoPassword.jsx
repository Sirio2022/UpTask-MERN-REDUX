export default function NuevoPassword() {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y accede a tu{' '}
        <span className="text-slate-700">cuenta</span>{' '}
      </h1>

      <form className="mt-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            htmlFor="nuevo-password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nuevo Pasword
          </label>
          <input
            type="password"
            placeholder="Ingresa tu nuevo password"
            id="nuevo-password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Nuevo password"
          className="bg-sky-600 w-full text-white uppercase py-3 mb-5 font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
}
