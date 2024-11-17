import { Client, Property, RentPayment, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRentPayment(data) {
  if (!data)
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  if (!data.amount || data.amount <= 0)
    return NextResponse.json(
      { error: "Invalid amount provided" },
      { status: 400 }
    );
  if (!data.date)
    return NextResponse.json({ error: "No date provided" }, { status: 400 });
  if (!data.paymentId)
    return NextResponse.json(
      { error: "No payment ID provided" },
      { status: 400 }
    );
  if (!data.ownerId)
    return NextResponse.json(
      { error: "No owner ID provided" },
      { status: 400 }
    );
  if (!data.leaseOrderId)
    return NextResponse.json(
      { error: "No lease order ID provided" },
      { status: 400 }
    );
  if (!data.leaseOrderType)
    return NextResponse.json(
      { error: "No lease order Type provided" },
      { status: 400 }
    );
  if (!data.paymentableId)
    return NextResponse.json(
      { error: "No paymentable ID provided" },
      { status: 400 }
    );
  if (!data.paymentableType)
    return NextResponse.json(
      { error: "No paymentable type provided" },
      { status: 400 }
    );

  try {
    const property =
      data.paymentableType === "PROPERTY"
        ? await Property.findByPk(data.paymentableId)
        : await Room.findByPk(data.paymentableId, {
            include: {
              model: Property,
              as: "property",
              attributes: ["ownerId"],
            },
          });
    if (!property) {
      return NextResponse.json(
        { error, message: "Paymentable not found" },
        { status: 404 }
      );
    }

    const client = await Client.findByPk(data.clientId);
    if (!client) {
      return NextResponse.json(
        { error, message: "Client not found" },
        { status: 404 }
      );
    }

    // Crear el pago de renta
    const rentPayment = await RentPayment.create({
      amount: data.amount,
      date: new Date(data.date),
      status: data.status || "APPROVED", // El estado por defecto es 'APPROVED'
      description: data.description || "",
      quotaNumber: data.quotaNumber || "1", // Asignar la cuota, por defecto es '1'
      type: data.type,
      paymentId: data.paymentId,
      paymentableId: data.paymentableId,
      paymentableType: data.paymentableType,
      leaseOrderId: data.leaseOrderId,
      leaseOrderType: data.leaseOrderType,
      ownerId: data.ownerId,
      clientId: data.clientId,
    });

    return NextResponse.json(rentPayment.toJSON(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
