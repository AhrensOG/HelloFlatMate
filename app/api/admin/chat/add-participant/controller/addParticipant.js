import { ChatParticipant } from "@/db/init";
import { NextResponse } from "next/server";

export async function addChatParticipant(req) {
    try {
        const body = await req.json();

        const { chatId, participantId, participantType } = body;

        if (!chatId || !participantId || !participantType) {
            return NextResponse.json(
                { error: "Faltan campos requeridos" },
                { status: 400 }
            );
        }

        const newParticipant = await ChatParticipant.create({
            chatId,
            participantId,
            participantType,
        });

        return NextResponse.json({
            message: "Participante añadido con éxito",
        });
    } catch (error) {
        console.error("Error al añadir participante:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
