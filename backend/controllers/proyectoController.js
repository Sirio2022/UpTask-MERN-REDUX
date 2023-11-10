import Proyecto from '../models/Proyecto.js';
import Usuario from '../models/Usuario.js';

const obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario._id })
      .sort({
        createdAt: -1,
      })
      .select('-tareas');
    res.json(proyectos);
  } catch (error) {
    console.log(error);
  }
};

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    await proyecto.save();

    res.status(201).json({ msg: 'Proyecto creado correctamente', proyecto });
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id)
      .populate('tareas')
      .populate(
        'colaboradores',
        '-password -__v -confirmado -createdAt -token -updatedAt'
      );

    if (!proyecto) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ msg: error.message });
    } else if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No autorizado para ver este proyecto');
      return res.status(401).json({ msg: error.message });
    }

    res.json(proyecto);
  } catch (error) {
    console.log(error);
  }
};

const actualizarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ msg: error.message });
    } else if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No autorizado para modificar este proyecto');
      return res.status(401).json({ msg: error.message });
    }

    const proyectoActualizado = await Proyecto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      msg: 'Proyecto actualizado correctamente',
      proyectoActualizado,
    });
  } catch (error) {
    console.log(error);
  }
};

const eliminarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ msg: error.message });
    } else if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No autorizado para eliminar este proyecto');
      return res.status(401).json({ msg: error.message });
    }

    await Proyecto.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Proyecto eliminado correctamente' });
  } catch (error) {
    console.log(error);
  }
};

const buscarColaborador = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuario.findOne({ email }).select(
    '-password -__v -confirmado -createdAt -token -updatedAt'
  );

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    res.status(404).json({ msg: error.message });
    return;
  }
  res.status(200).json(usuario);
};

const agregarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado');
    res.status(404).json({ msg: error.message });
    return;
  } else if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      'No autorizado para agregar colaboradores a este proyecto'
    );
    res.status(401).json({ msg: error.message });
    return;
  }

  const { email } = req.body;

  const usuario = await Usuario.findOne({ email }).select(
    '-password -__v -confirmado -createdAt -token -updatedAt'
  );

  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    res.status(404).json({ msg: error.message });
    return;
  }

  // El colaborador no es el creador del proyecto
  if (proyecto.creador.toString() === usuario._id.toString()) {
    const error = new Error(
      'El colaborador no puede ser el creador del proyecto'
    );
    res.status(400).json({ msg: error.message });
    return;
  }

  // El colaborador ya está agregado al proyecto
  if (proyecto.colaboradores.includes(usuario._id.toString())) {
    const error = new Error('El colaborador ya está agregado al proyecto');
    res.status(400).json({ msg: error.message });
    return;
  }
  proyecto.colaboradores.push(usuario._id);
  await proyecto.save();
  res.status(200).json({ msg: 'Colaborador agregado correctamente' });
};

const eliminarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado');
    res.status(404).json({ msg: error.message });
    return;
  } else if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      'No autorizado para eliminar colaboradores de este proyecto'
    );
    res.status(401).json({ msg: error.message });
    return;
  }

  const colaborador = await Usuario.findById(req.params.idColaborador);

  if (!colaborador) {
    const error = new Error('Colaborador no encontrado');
    res.status(404).json({ msg: error.message });
    return;
  }

  // El colaborador no está agregado al proyecto
  if (!proyecto.colaboradores.includes(colaborador._id.toString())) {
    const error = new Error('El colaborador no está agregado al proyecto');
    res.status(400).json({ msg: error.message });
    return;
  }

  proyecto.colaboradores.pull(colaborador._id);
  await proyecto.save();
  res.status(200).json({ msg: 'Colaborador eliminado correctamente' });
};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  actualizarProyecto,
  eliminarProyecto,
  buscarColaborador,
  agregarColaborador,
  eliminarColaborador,
};
