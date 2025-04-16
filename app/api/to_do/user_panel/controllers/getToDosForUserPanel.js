import { ToDo, ToDoMessage, Worker } from "@/db/init";
import { NextResponse } from "next/server";

export async function getToDosForUserPanel(clientId) {
  if (!clientId) {
    return NextResponse.json(
      { error: "No client ID provided" },
      { status: 400 }
    );
  }

  try {
    const toDos = await ToDo.findAll({
      where: { userId: clientId },
      include: [
        {
          model: Worker,
          as: "worker",
          attributes: ["name", "lastName"],
        },
        {
          model: ToDoMessage,
          as: "messages",
          order: [["createdAt", "ASC"]],
        },
      ],
    });

    return NextResponse.json(toDos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener las incidencias" },
      { status: 500 }
    );
  }
}
