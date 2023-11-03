import nodemailer from 'nodemailer';

export const emailRegistration = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transport.sendMail({
    from: "'UpTask - Administrador de Proyectos' <cuentas@uptask.com>",
    to: email,
    subject: 'Confirma tu cuenta en UpTask',
    text: `Hola ${nombre}, confirma tu cuenta en UpTask`,
    html: `
         <p>Hola ${nombre}, confirma tu cuenta en UpTask</p>
            <p>Da click en el siguiente enlace para confirmar tu cuenta</p>
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>
            <p>Si no has sido tú, ignora este mensaje</p>
            
        `,
  });
};
export const emailOlvidePassword = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transport.sendMail({
    from: "'UpTask - Administrador de Proyectos' <cuentas@uptask.com>",
    to: email,
    subject: 'UpTask - Reestablece tu contraseña',
    text: `Hola ${nombre}, reestablece tu contraseña en UpTask`,
    html: `
         <p>Hola ${nombre}, has solicitado cambiar tu password en UpTask</p>
            <p>Da click en el siguiente enlace para generar un nuevo password</p>
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Nuevo password</a>
            <p>Si no has sido tú, ignora este mensaje</p>
            
        `,
  });
};
