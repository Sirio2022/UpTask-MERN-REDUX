import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      req.usuario = await Usuario.findById(decodedToken.id).select(
        '-password -token -__v -confirmado -createdAt -updatedAt'
      );
      //console.log(req.usuario);
      return next();
    } catch (error) {
      return res.status(401).json({ msg: 'Token no válido' });
    }
  } else {
    return res.status(401).json({ msg: 'No autorizado, no hay token' });
  }
};

export default checkAuth;
