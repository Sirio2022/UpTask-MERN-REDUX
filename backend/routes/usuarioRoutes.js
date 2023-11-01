import express from 'express';
import {
  registar,
  autenticar,
  confirmarUsuario,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Autenticar, Registrar y confirmar usuarios
router.post('/', registar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmarUsuario);
router.post('/olvidar-password', olvidePassword);
router
  .route('/olvidar-password/:token')
  .get(comprobarToken)
  .post(nuevoPassword);

// Obtener datos de usuario
router.get('/perfil', checkAuth, perfil);

export default router;
