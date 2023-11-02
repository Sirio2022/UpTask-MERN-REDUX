import PropTypes from 'prop-types';

export default function Alerta({ alerta }) {
  return (
    <div
      className={`${
        alerta.error ? 'bg-red-400 to-red-600' : 'bg-green-400 to-green-600'
      } bg-gradient-to-br  p-3 w-full my-10 max-w-lg text-center text-white mx-auto rounded-xl font-bold uppercase text-sm`}
    >
      {alerta.msg}
    </div>
  );
}

Alerta.propTypes = {
  alerta: PropTypes.object.isRequired,
};
