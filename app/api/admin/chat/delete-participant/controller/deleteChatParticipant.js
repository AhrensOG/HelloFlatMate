import { ChatParticipant } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteChatParticipant(id) {
    try {
        if (!id) {
            return NextResponse.json(
                { error: "ID requerido" },
                { status: 400 }
            );
        }

        const participant = await ChatParticipant.findByPk(id);

        if (!participant) {
            return NextResponse.json({
                message: "Participante no encontrado",
            });
        }

        await participant.destroy();
        return NextResponse.json({
            message: "Participante eliminado con éxito",
        });
    } catch (error) {
        return NextResponse(error.message, { status: 500 });
    }
}
