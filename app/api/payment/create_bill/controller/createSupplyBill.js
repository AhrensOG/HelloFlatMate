import { Client, LeaseOrderRoom, Property, Supply, Room } from "@/db/init";
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

export async function createSupplyBill(data) {
  if (!data || !data.paymentId || !data.userId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const supplyPayment = await Supply.findByPk(data.paymentId);
    if (!supplyPayment) {
      return NextResponse.json(
        { error: "Supply payment not found" },
        { status: 404 }
      );
    }

    const client = await Client.findByPk(data.userId);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const { leaseOrderId } = supplyPayment;

    if (!leaseOrderId) {
      return NextResponse.json(
        { error: "Incomplete payment data" },
        { status: 400 }
      );
    }

    const leaseOrder = await LeaseOrderRoom.findByPk(leaseOrderId);

    if (!leaseOrder) {
      return NextResponse.json(
        { error: "LeaseOrder not found" },
        { status: 400 }
      );
    }
    const room = await Room.findByPk(leaseOrder.roomId, {
      include: {
        model: Property,
        as: "property",
      },
    });

    if (!leaseOrder || !room) {
      return NextResponse.json(
        { error: "Lease order or room not found" },
        { status: 404 }
      );
    }

    const detailsPayments = [
      {
        amount: supplyPayment.amount,
        date: supplyPayment.date,
        id: supplyPayment.id,
        description: supplyPayment.name,
      },
    ];

    const pdfData = {
      id: supplyPayment.id,
      clienteName: `${client.name || ""} ${client.lastName || ""}`.trim(),
      clienteDni: client.idNum || "N/A",
      clienteAddress: `${client.street || ""} ${
        client.streetNumber || ""
      }`.trim(),
      clienteCity: `${client.city || ""} CP: ${client.postalCode || ""}`.trim(),
      clientePhone: client.phone || "N/A",
      clienteEmail: client.email || "N/A",
      room: `${room.property?.street || ""} ${
        room.property?.streetNumber || ""
      } P${room.property?.floor || ""}`,
      roomCode: room.serial,
      gender: room.property?.typology,
      invoiceNumber: supplyPayment.id,
      invoicePeriod: `${formatDate(leaseOrder.startDate)} / ${formatDate(
        leaseOrder.endDate
      )}`,
      details: detailsPayments,
      totalAmount: supplyPayment.amount,
    };

    const pdfStream = await newBillBuilder(pdfData);

    return new NextResponse(pdfStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="factura_${supplyPayment.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
