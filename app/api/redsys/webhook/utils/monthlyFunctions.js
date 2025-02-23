import { billBuilder } from "@/app/api/pdf_creator/utils/billBuilder";
import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
import { Client, LeaseOrderRoom, Property, RentPayment, Room } from "@/db/init";
import { baseTemplate } from "./emailTemplates";
import { NextResponse } from "next/server";

// 🚀 Procesador de Pagos - Mensual
async function processMonthlyPayment({
  paymentId,
  paymentableId,
  leaseOrderId,
  paymentableType,
  clientId,
  amount,
  quotaNumber,
  month,
  order,
  HFM_MAIL,
}) {
  try {
    // 1️⃣ Obtener Datos Relevantes
    const [foundRoom, foundLeaseOrder, client] = await Promise.all([
      Room.findByPk(paymentableId, {
        include: {
          model: Property,
          as: "property",
          attributes: [
            "ownerId",
            "street",
            "streetNumber",
            "typology",
            "floor",
          ],
        },
      }),
      LeaseOrderRoom.findByPk(leaseOrderId),
      Client.findByPk(clientId),
    ]);

    if (!foundRoom || !foundLeaseOrder || !client) {
      throw new Error(
        `Error en datos: Room(${!foundRoom}), LeaseOrder(${!foundLeaseOrder}), Client(${!client})`
      );
    }

    // 2️⃣ Actualizar Datos de Pago
    const rentPayment = await RentPayment.findByPk(paymentId);

    if (!rentPayment) {
      throw new Error("No se encontró el pago correspondiente para actualizar");
    }

    rentPayment.status = "APPROVED";
    rentPayment.date = new Date();
    rentPayment.paymentId = order || "";

    await rentPayment.save();

    // 3️⃣ Enviar Correo
    await sendMailFunction({
      to: client.email,
      subject: `Pago mensual ${foundRoom.serial}`,
      html: baseTemplate(client.name, client.lastName, foundRoom.serial, month),
      // attachments: [
      //   {
      //     content: pdfBase64,
      //     filename: `factura_${rentPayment.id}.pdf`,
      //     type: "application/pdf",
      //     disposition: "attachment",
      //   },
      // ],
      cc: HFM_MAIL,
    });

    console.log(
      `✅ Rent Payment with ID ${rentPayment.id} updated to APPROVED`
    );

    return NextResponse.json(
      {
        message: "Webhook procesado correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`❌ Error en el proceso de pago mensual: ${error.message}`);
    return NextResponse.json(
      {
        message: `❌ Error en el proceso de pago mensual: ${error.message}`,
      },
      { status: 400 }
    );
  }
}

// 🚀 Preparar Datos para PDF Mensual
function prepareMonthlyPdfData({
  rentPayment,
  client,
  foundRoom,
  foundLeaseOrder,
  order,
  detailsPayments,
  month,
}) {
  return {
    id: rentPayment.id,
    clienteName: `${client.name || "-"} ${client.lastName || "-"}`,
    clienteDni: client.idNum || "N/A",
    clienteAddress: `${client.street || "-"} ${client.streetNumber || "-"}`,
    clienteCity: `${client.city || "-"} CP: ${client.postalCode || "-"}`,
    clientePhone: client.phone || "N/A",
    clienteEmail: client.email || "N/A",
    room: `${foundRoom.property?.street} ${foundRoom.property?.streetNumber} ${foundRoom.property?.floor}`,
    roomCode: foundRoom.serial,
    gender: foundRoom.property?.typology
      ? foundRoom.property.typology === "MIXED"
        ? "mixto"
        : foundRoom.property.typology === "ONLY_WOMEN"
        ? "solo mujeres"
        : foundRoom.property.typology === "ONLY_MEN"
        ? "solo hombres"
        : "-"
      : "-",
    invoiceNumber: order,
    invoicePeriod:
      formatDate(foundLeaseOrder.startDate) +
      " / " +
      formatDate(foundLeaseOrder.endDate),
    details: detailsPayments,
    totalAmount: detailsPayments.reduce((total, p) => total + p.amount, 0),
    returnBytes: true,
  };
}

export { processMonthlyPayment };
