import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail(data) {
  const { to, subject, text } = data;
  if (!to || !subject || !text) {
    console.error("Missing data (to / subject / text): ", data);
    return NextResponse.json("Missing data (to / subject / text)", {
      status: 400,
    });
  }
  const mailOptions = {
    from: process.env.MAIL_USER, // Debe ser un correo verificado en SendGrid
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const result = await sendgrid.send(mailOptions);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
