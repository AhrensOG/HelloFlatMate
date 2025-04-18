import { Incidence, Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function createPaymentForOwner(data) {
  try {
    const { toDoId, amount, type, title, description, url = null } = data;

    if (!toDoId || !data.propertyId) {
      return NextResponse.json(
        { error: "Faltan datos requeridos: toDoId o propertyId" },
        { status: 400 }
      );
    }

    // Buscar la propiedad para obtener el ownerId
    const property = await Property.findOne({
      where: { id: data.propertyId },
      attributes: ["ownerId"],
    });

    if (!property) {
      return NextResponse.json(
        { error: "Propiedad no encontrada" },
        { status: 404 }
      );
    }

    // Crear la incidencia para el propietario
    const incidence = await Incidence.create({
      ownerId: property.ownerId,
      propertyId: data.propertyId,
      amount,
      type,
      date: new Date(),
      title: title || `Incidencia generada automáticamente`,
      description:
        description ||
        "Esta incidencia fue generada tras finalizar una tarea de mantenimiento con responsabilidad asignada al propietario.",
      status: amount != null && amount > 0 ? "PENDING" : "APPROVED",
      paymentId: null,
      toDoId,
    });

    return NextResponse.json(incidence, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
