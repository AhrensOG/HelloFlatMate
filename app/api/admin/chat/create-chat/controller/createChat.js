import { Chat, ChatParticipant } from "@/db/init";
import { NextResponse } from "next/server";

export async function createChat(req) {
    try {
        const body = await req.json();
        const { type, relatedId, relatedType, ownerId } = body;

        if (!type || !relatedId || !relatedType || !ownerId) {
            return NextResponse.json(
                { error: "Faltan campos requeridos" },
                { status: 400 }
            );
        }

        // Crear el chat
        const chat = await Chat.create({
            type,
            ownerId,
            relatedId,
            relatedType,
            isActive: true,
        });

        // Añadir automáticamente al owner como participante
        await ChatParticipant.create({
            chatId: chat.id,
            participantId: ownerId,
            participantType: "OWNER",
        });

        return NextResponse.json({
            message: "Chat creado con éxito",
            chatId: chat.id,
        });
    } catch (error) {
        console.error("Error al crear chat:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
