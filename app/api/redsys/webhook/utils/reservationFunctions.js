import { billBuilder } from "@/app/api/pdf_creator/utils/billBuilder";
import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
import { Client, LeaseOrderRoom, Property, RentPayment, Room } from "@/db/init";
import { reservationTemplate } from "./emailTemplates";
import { NextResponse } from "next/server";

// 🚀 Procesador de Pagos - Reserva
async function processReservation({
  leaseOrderId,
  roomId,
  userEmail,
  price,
  order,
  HFM_MAIL,
}) {
  try {
    // 1️⃣ Obtener Datos Relevantes
    const [successLeaseOrderRoom, theRoom, client] = await Promise.all([
      LeaseOrderRoom.findByPk(leaseOrderId),
      Room.findByPk(roomId, {
        include: {
          model: Property,
          as: "property",
          attributes: [
            "ownerId",
            "street",
            "streetNumber",
            "floor",
            "typology",
          ],
        },
      }),
      Client.findOne({ where: { email: userEmail } }),
    ]);

    if (!successLeaseOrderRoom || !theRoom || !client) {
      throw new Error(
        `Error en datos: LeaseOrderRoom(${!successLeaseOrderRoom}), Room(${!theRoom}), Client(${!client})`
      );
    }

    // 2️⃣ Preparar Datos de Pago
    const type = "ROOM";

    const amountNumber = Number(price) || 0;

    const rentData = {
      amount: amountNumber,
      type: "RESERVATION",
      paymentableId: roomId,
      paymentableType: type,
      clientId: client.id,
      leaseOrderId,
      leaseOrderType: type,
      status: "APPROVED",
      quotaNumber: 1,
      date: new Date(),
      ownerId: theRoom.property.ownerId,
      paymentId: order || "",
      description: "Pago reserva (Redsys)",
    };

    // 3️⃣ Crear Pago y Actualizar Estados
    const [rentPayment] = await Promise.all([
      RentPayment.create(rentData),
      theRoom.update({ isActive: false }),
      successLeaseOrderRoom.update({ status: "APPROVED" }),
    ]);

    console.log(`✅ Pago Reserva creado ID: ${rentPayment.id}`);

    // // 4️⃣ Generar PDF
    // const pdfData = preparePdfData({
    //   rentPayment,
    //   client,
    //   theRoom,
    //   order,
    //   successLeaseOrderRoom,
    // });

    // const pdfBytes = await billBuilder(pdfData);
    // const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    // 5️⃣ Enviar Correo
    await sendMailFunction({
      to: client.email,
      subject: `¡Reserva realizada correctamente! Alojamiento ${theRoom.serial}`,
      html: reservationTemplate(client.name, client.lastName, theRoom.serial),
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

    console.log(`✅ Correo enviado al cliente: ${client.email}`);
    return NextResponse.json(
      {
        message: "Webhook procesado correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`❌ Error en el proceso de reserva: ${error.message}`);
    return NextResponse.json(
      {
        message: `❌ Error en el proceso de reserva: ${error.message}`,
      },
      { status: 400 }
    );
  }
}

// 🚀 Preparar Datos para PDF
function preparePdfData({
  rentPayment,
  client,
  theRoom,
  order,
  successLeaseOrderRoom,
}) {
  return {
    id: rentPayment.id,
    clienteName: `${client.name || ""} ${client.lastName || ""}`,
    clienteDni: client.idNum || "N/A",
    clienteAddress: `${client.street || ""} ${client.streetNumber || ""}`,
    clienteCity: `${client.city || ""} CP: ${client.postalCode || ""}`,
    clientePhone: client.phone || "N/A",
    clienteEmail: client.email || "N/A",
    room: `${theRoom.property?.street} ${theRoom.property?.streetNumber} ${theRoom.property?.floor}`,
    roomCode: theRoom.serial,
    gender: theRoom.property?.typology
      ? theRoom.property.typology === "MIXED"
        ? "mixto"
        : theRoom.property.typology === "ONLY_WOMEN"
        ? "solo mujeres"
        : theRoom.property.typology === "ONLY_MEN"
        ? "solo hombres"
        : "-"
      : "-",
    invoiceNumber: order,
    invoicePeriod:
      formatDate(successLeaseOrderRoom.startDate) +
      " / " +
      formatDate(successLeaseOrderRoom.endDate),
    details: [
      {
        amount: rentPayment.amount,
        date: rentPayment.date,
        status: rentPayment.status,
        id: rentPayment.paymentId,
        quotaNumber: rentPayment.quotaNumber,
      },
    ],
    totalAmount: rentPayment.amount,
    returnBytes: true,
  };
}

function formatDate(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

export { processReservation };
