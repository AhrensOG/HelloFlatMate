import { ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function createToDo(data) {
  if (!data)
    return NextResponse.json({ error: "No data provided" }, { status: 400 });

  // Campos obligatorios según el modelo
  const requiredFields = [
    "title",
    "body",
    "creationDate", // vamos a generarla automáticamente si no viene
    "type",
    "status",
    "userId",
    "typeUser",
  ];

  // Seteo de creationDate si no viene
  data.creationDate = data.creationDate || new Date();

  for (const field of requiredFields) {
    if (
      data[field] === undefined ||
      data[field] === null ||
      (typeof data[field] === "string" && data[field].trim() === "")
    ) {
      return NextResponse.json(
        { error: `Missing or invalid field: ${field}` },
        { status: 400 }
      );
    }
  }

  // Enums
  const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
  const validTypes = ["CLEAN", "REPAIR"];
  const validTypeUsers = ["CLIENT", "OWNER"];

  if (!validStatuses.includes(data.status))
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  if (!validTypes.includes(data.type))
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  if (!validTypeUsers.includes(data.typeUser))
    return NextResponse.json({ error: "Invalid typeUser" }, { status: 400 });

  // Campos opcionales completos (según modelo + los nuevos que estás usando)
  const allFields = {
    title: data.title,
    body: data.body,
    creationDate: new Date(data.creationDate),
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
    type: data.type,
    status: data.status,
    comment: data.comment ?? null,
    clientMessage: data.clientMessage ?? null,
    isPresent: data.isPresent ?? null,
    userId: data.userId,
    typeUser: data.typeUser,
    leaseOrderId: data.leaseOrderId ? parseInt(data.leaseOrderId) : null,
    cancellationReason: data.cancellationReason ?? null,
    imageUrl: data.imageUrl ?? null,
    preferredTimeSlot: data.preferredTimeSlot ?? null,
    incidentSite: data.incidentSite ?? null,
    incidentType: data.incidentType ?? null,
    emergency: data.emergency ?? null,
    reprogrammed: data.reprogrammed ?? null,
    reprogrammedStartDate: data.reprogrammedStartDate
      ? new Date(data.reprogrammedStartDate)
      : null,
    reprogrammedEndDate: data.reprogrammedEndDate
      ? new Date(data.reprogrammedEndDate)
      : null,
    reprogramingComment: data.reprogramingComment ?? null,
    closingComments: data.closingComments ?? null,
    responsibility: data.responsibility ?? null,
    amount: data.amount ?? null,
    // Campos adicionales que estás enviando
    workerId: data.workerId ?? null,
    propertyId: data.propertyId ?? null,
    bill: data.bill ?? null,
  };

  try {
    const newToDo = await ToDo.create(allFields);
    return NextResponse.json(newToDo, { status: 201 });
  } catch (error) {
    console.error("Error creating ToDo:", error);
    return NextResponse.json({ error: "Error creating ToDo" }, { status: 500 });
  }
}
