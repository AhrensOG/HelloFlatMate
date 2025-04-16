import { ToDo, ToDoMessage } from "@/db/init";
import { NextResponse } from "next/server";

export async function createToDoMessage(data) {
  const requiredFields = [
    { key: "toDoId", message: "ToDo ID is required" },
    { key: "senderId", message: "Sender ID is required" },
    { key: "senderType", message: "Sender type is required" },
  ];

  for (const field of requiredFields) {
    if (!data[field.key] || (typeof data[field.key] === "string" && data[field.key].trim() === "")) {
      return NextResponse.json({ error: field.message }, { status: 400 });
    }
  }

  if (!["CLIENT", "WORKER"].includes(data.senderType)) {
    return NextResponse.json({ error: "Invalid sender type" }, { status: 400 });
  }

  if (!data.body?.trim() && !data.imageUrl) {
    return NextResponse.json({ error: "Message must include text or image" }, { status: 400 });
  }

  try {
    const toDo = await ToDo.findByPk(data.toDoId);
    if (!toDo) {
      return NextResponse.json({ error: "ToDo not found" }, { status: 404 });
    }

    const message = await ToDoMessage.create({
      toDoId: data.toDoId,
      senderId: data.senderId,
      senderType: data.senderType,
      senderName: data.senderName || null,
      senderLastName: data.senderLastName || null,
      body: data.body?.trim() || null,
      imageUrl: data.imageUrl || null,
      createdAt: new Date(),
    });

    return NextResponse.json(message, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
