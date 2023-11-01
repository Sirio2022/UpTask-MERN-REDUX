import express from 'express';
import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  actualizarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
} from '../controllers/proyectoController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router
  .route('/')
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);
router
  .route('/:id')
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, actualizarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.post('/agregar-colaborador/:id', checkAuth, agregarColaborador);
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador);

export default router;
