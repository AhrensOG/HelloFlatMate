import { ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function fullUpdateToDo(data) {
  if (!data || !data.id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const toDo = await ToDo.findByPk(data.id);
    if (!toDo) {
      return NextResponse.json({ error: "To Do not found" }, { status: 404 });
    }

    const updatableFields = [
      "title",
      "body",
      "startDate",
      "endDate",
      "status",
      "comment",
      "clientMessage",
      "isPresent",
      "cancellationReason",
      "preferredTimeSlot",
      "incidentSite",
      "incidentType",
      "emergency",
      "reprogrammed",
      "reprogrammedStartDate",
      "reprogrammedEndDate",
      "reprogramingComment",
      "closingComments",
      "responsibility",
      "amount",
      "workerId",
      "bill"
    ];

    updatableFields.forEach((field) => {
      if (field in data) {
        toDo[field] = data[field];
      }
    });

    await toDo.save();
    return NextResponse.json(toDo, { status: 200 });
  } catch (error) {
    console.error("Error updating ToDo:", error);
    return NextResponse.json({ error: "Error updating ToDo" }, { status: 500 });
  }
}
