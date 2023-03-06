const nodemailer = require('nodemailer');

module.exports = (formulario) => {
  console.log(formulario);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jenniffer.jg59@gmail.com', // Cambialo por tu email
      pass: 'qefykrhluamwdbme' // Cambialo por tu password
    }
  });


  const mailOptions = {
    from: `jenniffer.jg59@gmail.com`,
    to: formulario.Correo, // Cambia esta parte por el destinatario
    subject: formulario.extra,
    html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>Cédula:</strong> ${formulario.Cedula} <br/>
 <strong>Teléfono:</strong> ${formulario.Telefono} <br/>
 <strong>Correo:</strong> ${formulario.Correo} <br/>
 <strong>Tipo de habitación:</strong> ${formulario.TipoHabitacion} <br/>
 <strong>Mensaje:</strong> ${formulario.extra} <br/>
 <strong>Imagen:</strong>       <img  class="zoom"  width="200px" src="${formulario.img}" alt="" srcset="">  <br/>
 `
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}
