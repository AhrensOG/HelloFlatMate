import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMailFunction(data) {
  const { to, subject, text } = data;
  if (!to || !subject || !text) {
    console.error("Missing data (to / subject / text): ", data);
    return;
  }
  const mailOptions = {
    from: process.env.MAIL_USER, // Debe ser un correo verificado en SendGrid
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await sendgrid.send(mailOptions);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
}
