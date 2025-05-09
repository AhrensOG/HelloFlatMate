import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail(data) {
  const { to, subject, text, html, cc } = data;
  if (!to || !subject) {
    console.error("Missing data (to / subject): ", data);
    return NextResponse.json("Missing data (to / subject / text)", {
      status: 400,
    });
  }

  let mailOptions = {
    from: process.env.MAIL_USER, // Debe ser un correo verificado en SendGrid
    to: to,
    subject: subject,
  };

  if (text) {
    mailOptions.text = text;
  }
  if (html) {
    mailOptions.html = html;
  }
  if (cc) {
    mailOptions.cc = cc;
  }

  try {
    const result = await sendgrid.send(mailOptions);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
