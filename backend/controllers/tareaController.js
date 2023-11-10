import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

const agregarTarea = async (req, res) => {
  try {
    const proyectoExiste = await Proyecto.findById({ _id: req.body.proyecto });

    if (!proyectoExiste) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).send({ msg: error.message });
    }

    if (proyectoExiste.creador.toString() !== req.usuario.id.toString()) {
      const error = new Error(
        'No estás autorizado para agregar tareas a este proyecto'
      );
      return res.status(401).json({ msg: error.message });
    }

    const tarea = await Tarea.create(req.body);

    // Agregar tarea al proyecto
    proyectoExiste.tareas.push(tarea._id);
    await proyectoExiste.save();

    res.json({
      msg: 'Tarea agregada correctamente',
      tarea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

const obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById({ _id: req.params.id });

    if (!tarea) {
      const error = new Error('Tarea no encontrada');
      return res.status(404).json({ msg: error.message });
    }

    const proyecto = await Proyecto.findById(tarea.proyecto);

    if (proyecto.creador.toString() !== req.usuario.id.toString()) {
      const error = new Error('No estás autorizado para ver esta tarea');
      return res.status(401).json({ msg: error.message });
    }

    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

const actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById({ _id: req.params.id });

    if (!tarea) {
      const error = new Error('Tarea no encontrada');
      return res.status(404).json({ msg: error.message });
    }

    const proyecto = await Proyecto.findById(tarea.proyecto);

    if (proyecto.creador.toString() !== req.usuario.id.toString()) {
      const error = new Error('No estás autorizado para actualizar esta tarea');
      return res.status(401).json({ msg: error.message });
    }

    const actualizarTarea = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json({
      msg: 'Tarea actualizada correctamente',
      tarea: actualizarTarea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

const eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById({ _id: req.params.id });

    if (!tarea) {
      const error = new Error('Tarea no encontrada');
      return res.status(404).json({ msg: error.message });
    }

    const proyecto = await Proyecto.findById(tarea.proyecto);

    if (proyecto.creador.toString() !== req.usuario.id.toString()) {
      const error = new Error('No estás autorizado para eliminar esta tarea');
      return res.status(401).json({ msg: error.message });
    }

    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

const cambiarEstadoTarea = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstadoTarea,
};
