import { Property, ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllToDosForIncidencePanel() {
  try {
    const toDos = await ToDo.findAll({
      attributes: ["id", "propertyId"],
      include: [
        {
          model: Property,
          as: "property",
          attributes: ["id", "serial"],
        },
      ],
    });
    return NextResponse.json(toDos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error obtein to dos" }, { status: 500 });
  }
}
