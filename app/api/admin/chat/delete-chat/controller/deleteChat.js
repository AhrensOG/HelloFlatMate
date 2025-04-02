import { Chat, ChatParticipant } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteChat(id) {
    try {
        if (!id) {
            return NextResponse.json(
                { error: "ID requerido" },
                { status: 400 }
            );
        }

        const chat = await Chat.findByPk(id);

        if (!chat) {
            return NextResponse.json({
                message: "Chat no encontrado",
            });
        }

        await ChatParticipant.destroy({
            where: {
                chatId: id,
            },
        });

        await chat.destroy();

        return NextResponse.json({
            message: "Chat y sus participantes eliminados con éxito",
        });
    } catch (error) {
        console.error("Error al eliminar el chat:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
