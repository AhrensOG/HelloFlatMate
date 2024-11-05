import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function sendMail(data) {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: "darmaster999@gmail.com",
        subject: "prueba",
        text: "probando",
    };

    try {
        const result = await transport.sendMail(mailOptions);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
