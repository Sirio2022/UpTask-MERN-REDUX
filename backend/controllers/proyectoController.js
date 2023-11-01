import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

const obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario._id }).sort({
      createdAt: -1,
    });
    res.json(proyectos);
  } catch (error) {
    console.log(error);
  }
};

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const almacenarProyecto = await proyecto.save();

    res.status(201).json(almacenarProyecto);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ msg: error.message });
    } else if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No autorizado para ver este proyecto');
      return res.status(401).json({ msg: error.message });
    }

    // Obtener tareas del proyecto
    const tareas = await Tarea.find({ proyecto: req.params.id }).sort({
      createdAt: -1,
    });

    const proyectoConTareas = {
      ...proyecto._doc,
      tareas,
    };

    res.json(proyectoConTareas);
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

    res.json(proyectoActualizado);
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

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  actualizarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
};