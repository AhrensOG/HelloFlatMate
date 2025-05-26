import {
  addRentPayments,
  addSupplies,
} from "@/app/api/redsys/webhook/utils/reservationFunctions";
import { LeaseOrderRoom, Room, Property, Client, RentPayment } from "@/db/init";
import { NextResponse } from "next/server";

export async function manualPaymentGeneration(data) {
  try {
    const { leaseOrderId } = data;

    if (!leaseOrderId) {
      return NextResponse.json(
        { message: "Falta el leaseOrderId" },
        { status: 400 }
      );
    }

    // 1️⃣ Obtener datos
    const leaseOrder = await LeaseOrderRoom.findByPk(leaseOrderId);
    if (!leaseOrder) {
      return NextResponse.json(
        { message: "No se encontró la leaseOrder" },
        { status: 404 }
      );
    }

    const room = await Room.findByPk(leaseOrder.roomId, {
      include: {
        model: Property,
        as: "property",
      },
    });

    const client = await Client.findByPk(leaseOrder.clientId);

    if (!room || !room.property || !client) {
      return NextResponse.json(
        { message: "Datos incompletos: room, propiedad o cliente faltantes" },
        { status: 400 }
      );
    }

    // 2️⃣ Crear pago de reserva (sin paymentId)
    const start = new Date(leaseOrder.startDate);
    const paymentMonth = new Date(start.getUTCFullYear(), start.getUTCMonth());

    await RentPayment.create({
      amount: leaseOrder.price,
      type: "RESERVATION",
      paymentableId: room.id,
      paymentableType: "ROOM",
      clientId: client.id,
      leaseOrderId: leaseOrder.id,
      leaseOrderType: "ROOM",
      status: "APPROVED",
      quotaNumber: 1,
      date: new Date(),
      ownerId: room.property.ownerId,
      paymentId: "-",
      description: `Pago reserva - ${paymentMonth
        .toLocaleString("es-ES", {
          month: "long",
        })
        .replace(/^./, (c) => c.toUpperCase())} ${paymentMonth.getFullYear()}`,
    });

    // 3️⃣ Marcar habitación como inactiva
    await room.update({ isActive: false });

    // 4️⃣ Aprobar la leaseOrder
    // await leaseOrder.update({ status: "APPROVED" });

    // 5️⃣ Generar suministros y pagos mensuales
    await addSupplies(room, leaseOrder, client);
    await addRentPayments(room, leaseOrder, client);

    return NextResponse.json(
      { message: "Cobros generados correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en manualPaymentGeneration:", error);
    return NextResponse.json(
      { message: `Error interno: ${error.message}` },
      { status: 500 }
    );
  }
}
