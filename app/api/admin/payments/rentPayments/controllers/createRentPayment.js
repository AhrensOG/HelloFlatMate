import { RentPayment, LeaseOrderRoom, Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRentPayment(req) {
  try {
    const body = await req.json();
    const {
      amount,
      date,
      description,
      leaseOrderId,
      paymentId,
      quotaNumber,
      status,
      type,
      userId,
    } = body;

    const leaseOrderRoom = await LeaseOrderRoom.findOne({
      where: { id: leaseOrderId },
      attributes: ["roomId", "propertyId"],
    });
    if (!leaseOrderRoom) {
      return NextResponse.json(
        { error: "LeaseOrderRoom not found" },
        { status: 404 }
      );
    }

    const property = await Property.findOne({
      where: { id: leaseOrderRoom.propertyId },
      attributes: ["ownerId"],
    });
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Crear el pago de alquiler
    const rentPayment = await RentPayment.create({
      amount: amount,
      type: type,
      paymentableId: leaseOrderRoom.roomId,
      paymentableType: "ROOM",
      clientId: userId,
      leaseOrderId: leaseOrderId,
      leaseOrderType: "ROOM",
      status: status,
      quotaNumber: quotaNumber,
      date: new Date(date),
      ownerId: property.ownerId,
      paymentId: paymentId,
      description: description,
    });

    return NextResponse.json(rentPayment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
