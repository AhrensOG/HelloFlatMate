import { Client, LeaseOrderRoom, Property, RentPayment, Room } from "@/db/init";
import { NextResponse } from "next/server";
import { newBillBuilder } from "./newBillBuilder";

const formatDate = (date) => {
  if (!date) return 'Invalid date';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date'; // Fecha inválida

  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export async function createMonthlyOrReservationBill(data) {
  if (!data || !data.paymentId || !data.userId)
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );

  try {
    const rentPayment = await RentPayment.findByPk(data.paymentId);
    if (!rentPayment)
      return NextResponse.json(
        { error: "Rent payment not found" },
        { status: 404 }
      );

    const client = await Client.findByPk(data.userId);
    if (!client)
      return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const { leaseOrderId, paymentableType, paymentableId, quotaNumber } =
      rentPayment;

    if (!leaseOrderId || !paymentableType || !paymentableId || !quotaNumber)
      return NextResponse.json(
        { error: "Incomplete rent payment data" },
        { status: 400 }
      );

    const leaseOrder = await LeaseOrderRoom.findByPk(leaseOrderId);
    const room = await Room.findByPk(paymentableId, {
      include: {
        model: Property,
        as: "property",
      },
    });

    if (!leaseOrder || !room)
      return NextResponse.json(
        { error: "Lease order or room not found" },
        { status: 404 }
      );

    const allPayments = await RentPayment.findAll({
      where: {
        leaseOrderId: leaseOrderId,
        clientId: data.userId,
        paymentableType,
        paymentableId,
        status: "APPROVED",
      },
    });

    const detailsPayments = allPayments
      .filter((p) => p.quotaNumber <= quotaNumber)
      .map((p) => ({
        amount: p.amount,
        date: p.date,
        id: p.id,
        description: p.description,
      }))
      .sort((a, b) => b.quotaNumber - a.quotaNumber);

    const pdfData = {
      id: rentPayment.id,
      clienteName: `${client.name || ""} ${client.lastName || ""}`.trim(),
      clienteDni: client.idNum || "N/A",
      clienteAddress: `${client.street || ""} ${
        client.streetNumber || ""
      }`.trim(),
      clienteCity: `${client.city || ""} CP: ${client.postalCode || ""}`.trim(),
      clientePhone: client.phone || "N/A",
      clienteEmail: client.email || "N/A",
      room: room
        ? `${room.property?.street || ""} ${
            room.property?.streetNumber || ""
          } P${room.property?.floor || ""}`
        : "N/A",
      roomCode: room ? room.serial : "N/A",
      gender: room ? room.property?.typology : "N/A",
      invoiceNumber: rentPayment.id,
      invoicePeriod: `${formatDate(leaseOrder.startDate)} / ${formatDate(
        leaseOrder.endDate
      )}`,
      details: detailsPayments,
      totalAmount: detailsPayments.reduce((sum, p) => sum + p.amount, 0),
    };

    const pdfStream = await newBillBuilder(pdfData);

    return new NextResponse(pdfStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="factura_${rentPayment.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
