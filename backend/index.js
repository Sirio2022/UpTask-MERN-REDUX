import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json());

// Connect Database
dotenv.config();
connectDB();

// Enable CORS
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    // Revisar si la petición viene de un servidor que está en whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Routes
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io
import { Server } from 'socket.io';

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log('Nueva conexión de socketIO');

  // Definir los eventos que se van a escuchar
  socket.on('abrir-proyecto', (proyectoID) => {
    socket.join(proyectoID);
  });

  socket.on('nueva-tarea', (tarea) => {
    io.to(tarea.proyecto).emit('tarea-agregada', tarea);
  });
});
