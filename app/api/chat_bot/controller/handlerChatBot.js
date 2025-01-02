import OpenAI from "openai";
import { NextResponse } from "next/server";

// Configura el cliente de OpenAI

export async function handlerChatBot(data) {
    const { question } = data;
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        project: process.env.PROJECT_ID,
        organization: "org-thlQvGm1dvi8Rgqs1AlLKPFW",
    });
    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: question,
                },
            ],
            stream: true,
        });
    } catch (error) {
        console.error("Error al generar respuesta:", error);
        return NextResponse.json({ error: "Error generando respuesta" }, { status: 500 });
    }
}
