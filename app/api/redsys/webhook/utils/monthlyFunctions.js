import { billBuilder } from "@/app/api/pdf_creator/utils/billBuilder";
import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
import { Client, LeaseOrderRoom, Property, RentPayment, Room } from "@/db/init";
import { baseTemplate } from "./emailTemplates";
import { NextResponse } from "next/server";

// 🚀 Procesador de Pagos - Mensual
async function processMonthlyPayment({
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

    // 2️⃣ Preparar Datos de Pago
    const rentData = {
      amount: Number(amount),
      type: "MONTHLY",
      paymentableId,
      paymentableType,
      clientId,
      leaseOrderId,
      leaseOrderType: paymentableType,
      status: "APPROVED",
      quotaNumber,
      date: new Date(),
      ownerId: foundRoom.property.ownerId,
      paymentId: order || "",
      description: `Pago mensual - ${month}`,
    };

    // 3️⃣ Crear Pago
    const rentPayment = await RentPayment.create(rentData);

    // // 4️⃣ Obtener Historial de Pagos
    // const allRentPayments = await RentPayment.findAll({
    //   where: {
    //     clientId,
    //     leaseOrderId,
    //     leaseOrderType: paymentableType,
    //     paymentableId,
    //     paymentableType,
    //   },
    //   order: [["quotaNumber", "DESC"]],
    // });

    // const detailsPayments = allRentPayments.map((payment) => ({
    //   amount: payment.amount,
    //   date: payment.date,
    //   status: payment.status,
    //   id: payment.id,
    //   quotaNumber: payment.quotaNumber,
    // }));

    // // 5️⃣ Generar PDF
    // const pdfData = prepareMonthlyPdfData({
    //   rentPayment,
    //   client,
    //   foundRoom,
    //   foundLeaseOrder,
    //   order,
    //   detailsPayments,
    //   month,
    // });

    // const pdfBytes = await billBuilder(pdfData);
    // const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    // 6️⃣ Enviar Correo
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
