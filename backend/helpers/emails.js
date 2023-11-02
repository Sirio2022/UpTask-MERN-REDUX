import nodemailer from 'nodemailer';

export const emailRegistration = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '65e1e245109612',
      pass: '9f7fec3d33928f',
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
