import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true, // Elimina espacios al inicio y al final
    },
    email: {
      type: String,
      required: true,
      unique: true, // No se puede repetir
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true, // Elimina espacios al inicio y al final
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Antes de guardar el usuario en la base de datos
usuarioSchema.pre('save', async function (next) {
  // Si el password no fue modificado
  if (!this.isModified('password')) {
    return next();
  }

  // Si el password fue modificado
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparar passwords
usuarioSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
