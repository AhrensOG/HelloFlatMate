import { Client, Property, RentPayment, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateRentPayment(data) {
  if (!data.id)
    return NextResponse.json(
      { error: "No payment ID provided" },
      { status: 400 }
    );

  // Verificaciones básicas
  if (data.amount < 0)
    return NextResponse.json(
      { error: "Invalid amount provided" },
      { status: 400 }
    );
  if (data.date && isNaN(Date.parse(data.date)))
    return NextResponse.json(
      { error: "Invalid date provided" },
      { status: 400 }
    );
  if (data.paymentableId && !data.paymentableType)
    return NextResponse.json(
      { error: "No paymentable type provided" },
      { status: 400 }
    );
  if (data.paymentableType && !data.paymentableId)
    return NextResponse.json(
      { error: "No paymentable ID provided" },
      { status: 400 }
    );

  try {
    // Verificar si el pago existe
    const rentPayment = await RentPayment.findByPk(data.id);
    if (!rentPayment) {
      return NextResponse.json(
        { error: "RentPayment not found" },
        { status: 404 }
      );
    }

    // Validar la propiedad o la habitación
    const paymentable =
      data.paymentableType === "PROPERTY"
        ? await Property.findByPk(data.paymentableId)
        : await Room.findByPk(data.paymentableId, {
            include: {
              model: Property,
              as: "property",
              attributes: ["ownerId"],
            },
          });

    if (data.paymentableId && !paymentable) {
      return NextResponse.json(
        { error: "Paymentable not found" },
        { status: 404 }
      );
    }

    // Validar cliente
    if (data.clientId) {
      const client = await Client.findByPk(data.clientId);
      if (!client) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }
    }

    // Actualizar los campos del pago
    await rentPayment.update({
      amount: data.amount || rentPayment.amount,
      date: data.date ? new Date(data.date) : rentPayment.date,
      status: data.status || rentPayment.status,
      description: data.description || rentPayment.description,
      quotaNumber: data.quotaNumber || rentPayment.quotaNumber,
      type: data.type || rentPayment.type,
      paymentId: data.paymentId || rentPayment.paymentId,
    });

    return NextResponse.json(rentPayment.toJSON(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
