import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import { emailRegistration, emailOlvidePassword } from '../helpers/emails.js';
import e from 'express';

const registar = async (req, res) => {
  // Evitar duplicados
  const { email } = req.body;

  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error('El usuario ya existe en nuestra base de datos');
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();

    // Enviar email de confirmación

    const { email, nombre, token } = usuario;

    emailRegistration({
      email,
      nombre,
      token,
    });

    res.status(201).json({
      msg: 'Usuario registrado correctamente. Por favor, revisa tu correo electrónico para confirmar tu cuenta',
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  // Verificar si el usuario existe
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error('El usuario no existe en nuestra base de datos');
    return res.status(401).json({ msg: error.message });
  }

  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(401).json({ msg: error.message });
  }

  // Verificar si el password es correcto
  if (!(await usuario.compararPassword(password))) {
    const error = new Error('El password es incorrecto');
    return res.status(401).json({ msg: error.message });
  } else {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  }
};

const confirmarUsuario = async (req, res) => {
  const usuario = await Usuario.findOne({ token: req.params.token });

  if (!usuario) {
    const error = new Error('Token no válido');
    return res.status(401).json({ msg: error.message });
  }

  try {
    usuario.confirmado = true;
    usuario.token = '';

    await usuario.save();

    res.json({ msg: 'Usuario confirmado' });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error(
      'El email no es válido o no existe en nuestra base de datos'
    );
    return res.status(401).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    // Enviar email de confirmación

    const { email, nombre, token } = usuario;
    emailOlvidePassword({
      email,
      nombre,
      token,
    });

    res.json({
      msg: 'Se ha enviado un correo electrónico para restablecer tu contraseña',
    });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const usuario = await Usuario.findOne({ token: req.params.token });

  if (!usuario) {
    const error = new Error('Token no válido');
    return res.status(401).json({ msg: error.message });
  } else {
    res.json({ msg: 'Token válido' });
  }
};

const nuevoPassword = async (req, res) => {
  const usuario = await Usuario.findOne({ token: req.params.token });

  if (!usuario) {
    const error = new Error('Token no válido');
    return res.status(401).json({ msg: error.message });
  } else {
    try {
      usuario.password = req.body.password;
      usuario.token = '';

      await usuario.save();

      res.json({ msg: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.log(error);
    }
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export {
  registar,
  autenticar,
  confirmarUsuario,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
