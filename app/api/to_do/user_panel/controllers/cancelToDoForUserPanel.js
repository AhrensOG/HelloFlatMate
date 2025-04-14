import { ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function cancelToDoForUserPanel(data) {
  if (!data || !data.id) {
    return NextResponse.json(
      { error: "ID de la ToDo no proporcionado" },
      { status: 400 }
    );
  }

  if (!data.cancellationReason || data.cancellationReason.trim() === "") {
    return NextResponse.json(
      { error: "Debes escribir un motivo de cancelación" },
      { status: 400 }
    );
  }

  try {
    const toDo = await ToDo.findByPk(data.id);

    if (!toDo) {
      return NextResponse.json(
        { error: "ToDo no encontrada" },
        { status: 404 }
      );
    }

    toDo.status = "CANCELLED";
    toDo.cancellationReason = data.cancellationReason;
    await toDo.save();

    return NextResponse.json(toDo, { status: 200 });
  } catch (err) {
    console.error("Error al cancelar ToDo:", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
