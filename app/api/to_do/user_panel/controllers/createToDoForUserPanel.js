import { Client, Property, ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function createToDoForUserPanel(data) {
  if (!data)
    return NextResponse.json({ error: "No data provided" }, { status: 400 });

  const requiredFields = [
    { key: "title", message: "No title provided" },
    { key: "body", message: "No body provided" },
    { key: "type", message: "No type provided" },
    { key: "clientId", message: "No client ID provided" },
    { key: "propertyId", message: "No property ID provided" },
    { key: "startDate", message: "No start date provided" },
  ];

  for (const field of requiredFields) {
    const value = data[field.key];
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && value <= 0)
    ) {
      return NextResponse.json({ error: field.message }, { status: 400 });
    }
  }

  if (!["CLEAN", "REPAIR"].includes(data.type)) {
    return NextResponse.json({ error: "Invalid type value" }, { status: 400 });
  }

  try {
    const client = await Client.findByPk(data.clientId);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const property = await Property.findByPk(data.propertyId);
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const toDo = await ToDo.create({
      title: data.title,
      body: data.body,
      type: data.type,
      userId: client.id,
      propertyId: property.id,
      status: "PENDING",
      creationDate: new Date(),
      typeUser: "CLIENT",
      startDate: new Date(data.startDate),
      clientMessage: data.clientMessage ?? null,
      isPresent: data.isPresent ?? false,
      leaseOrderId: data.leaseOrderId ?? null,
      imageUrl: data.imageUrl ?? null
    });

    return NextResponse.json(toDo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }
}
