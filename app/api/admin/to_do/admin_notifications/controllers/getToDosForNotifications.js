import { Client, Property, ToDo, Worker } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllToDosForNotificationsAdminPanel() {
  const toDos = await ToDo.findAll({
    where: { status: "PENDING" },
    attributes: ["id"],
  });
  if (toDos) {
    return NextResponse.json(toDos.length || 0, { status: 200 });
  }
  return NextResponse.json({ error: "Error obtein to dos" }, { status: 500 });
}
