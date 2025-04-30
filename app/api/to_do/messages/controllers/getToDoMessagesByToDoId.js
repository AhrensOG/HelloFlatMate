import { ToDoMessage } from "@/db/init";
import { NextResponse } from "next/server";

export async function getToDoMessagesByToDoId(toDoId) {
  if (!toDoId) {
    return NextResponse.json({ error: "No toDoId provided" }, { status: 400 });
  }

  try {
    const messages = await ToDoMessage.findAll({
      where: { toDoId },
      order: [["createdAt", "ASC"]],
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error loading messages" },
      { status: 500 }
    );
  }
}
