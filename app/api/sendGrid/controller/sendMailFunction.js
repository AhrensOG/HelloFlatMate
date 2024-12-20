import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMailFunction(data) {
  const { to, subject, text, attachments, html } = data; // Añadimos `attachments` al destructuring
  if (!to || !subject ) {
    console.error("Missing data (to / subject): ", data);
    return;
  }
  const mailOptions = {
    from: process.env.MAIL_USER, // Debe ser un correo verificado en SendGrid
    to: to,
    subject: subject,
    text: text || " ",
    html: html || " ",
    attachments: attachments || [], // Adjunta los archivos si se proporcionan
  };

  try {
    await sendgrid.send(mailOptions);
  } catch (error) {
    console.error("Error al enviar correo:", error.response.body.errors);
  }
}
