import { Client, Property, ToDo, Worker } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllToDosForAdminPanel() {
  const toDos = await ToDo.findAll({
    include: [
      {
        model: Property,
        as: "property",
        attributes: [
          "city",
          "street",
          "streetNumber",
          "postalCode",
          "serial",
          "id",
        ],
      },
      {
        model: Client,
        as: "client",
        attributes: ["name", "lastName", "email", "phone"],
      },
      {
        model: Worker,
        as: "worker",
        attributes: ["name", "lastName"],
      }
    ],
  });
  if (toDos) {
    return NextResponse.json(toDos, { status: 200 });
  }
  return NextResponse.json({ error: "Error obtein to dos" }, { status: 500 });
}
