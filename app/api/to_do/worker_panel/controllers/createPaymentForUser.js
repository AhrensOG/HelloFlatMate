import { Supply, LeaseOrderRoom } from "@/db/init";
import { NextResponse } from "next/server";

export async function createPaymentForUser(data) {
  try {
    const { name, amount, leaseOrderId, status, type, userId } = data;

    // Buscar LeaseOrderRoom para obtener propertyId
    const leaseOrderRoom = await LeaseOrderRoom.findOne({
      where: { id: leaseOrderId },
      attributes: ["propertyId"],
    });
    if (!leaseOrderRoom) {
      return NextResponse.json(
        { error: "LeaseOrderRoom not found" },
        { status: 404 }
      );
    }

    // Crear el pago de suministro
    const supplyPayment = await Supply.create({
      name: name,
      amount: amount,
      date: new Date(),
      status: status,
      propertyId: leaseOrderRoom.propertyId,
      clientId: userId,
      type: type,
      expirationDate: new Date(),
      leaseOrderId: leaseOrderId,
      leaseOrderType: "ROOM",
    });

    return NextResponse.json(supplyPayment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
