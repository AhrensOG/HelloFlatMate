import { billBuilder } from "@/app/api/pdf_creator/utils/billBuilder";
import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
import {
  Client,
  LeaseOrderRoom,
  Property,
  RentPayment,
  Room,
  Supply,
} from "@/db/init";
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
            "category",
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

    const start = new Date(successLeaseOrderRoom.startDate);
    const paymentMonth = new Date(start.getUTCFullYear(), start.getUTCMonth());

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
      description: `Pago reserva - ${paymentMonth
        .toLocaleString("es-ES", {
          month: "long",
        })
        .replace(/^./, (char) =>
          char.toUpperCase()
        )} ${paymentMonth.getFullYear()}`,
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

    await addSupplies(theRoom, successLeaseOrderRoom, client);
    console.log(`✅ Suministros asignados al cliente: ${client.email}`);

    await addRentPayments(theRoom, successLeaseOrderRoom, client);
    console.log(`✅ Pagos mensuales asignados al cliente: ${client.email}`);

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

async function addSupplies(room, leaseOrder, client) {
  try {
    const currentDate = new Date();

    const startDate = new Date(leaseOrder.startDate);
    const endDate = new Date(leaseOrder.endDate);

    const monthsDifference =
      (endDate.getUTCFullYear() - startDate.getUTCFullYear()) * 12 +
      (endDate.getUTCMonth() - startDate.getUTCMonth());

    const isLongTerm = monthsDifference > 8;
    const startMonth = startDate.getUTCMonth() + 1;
    const shortTermLabel = startMonth >= 2 && startMonth <= 6 ? "2Q" : "1Q";

    const supplies = [];

    const pushSupply = (supply) =>
      supplies.push({
        date: currentDate,
        status: "PENDING",
        propertyId: room.propertyId,
        clientId: client.id,
        expirationDate: currentDate,
        leaseOrderId: leaseOrder.id,
        leaseOrderType: "ROOM",
        ...supply,
      });

    if (room.property?.category === "HELLO_LANDLORD") {
      pushSupply({ name: "Depósito", amount: 300, type: "DEPOSIT" });
      pushSupply({
        name: "Tasa de la agencia",
        amount: 459.8,
        type: "AGENCY_FEES",
      });
      pushSupply({
        name: `Wifi ${shortTermLabel}`,
        amount: 80,
        type: "INTERNET",
      });
      pushSupply({
        name: `Suministros ${shortTermLabel}`,
        amount: 200,
        type: "GENERAL_SUPPLIES",
      });
    } else {
      // Depósito
      pushSupply({
        name: "Depósito",
        amount: room.property?.category === "HELLO_COLIVING" ? 500 : 300,
        type: "DEPOSIT",
      });

      if (room.property?.category === "HELLO_COLIVING") {
        if (isLongTerm) {
          pushSupply({
            name: "Suministros 1Q",
            amount: 200,
            type: "GENERAL_SUPPLIES",
          });
          pushSupply({
            name: "Suministros 2Q",
            amount: 200,
            type: "GENERAL_SUPPLIES",
          });
        } else {
          pushSupply({
            name: `Suministros ${shortTermLabel}`,
            amount: 200,
            type: "GENERAL_SUPPLIES",
          });
        }
      } else {
        if (isLongTerm) {
          pushSupply({ name: "Wifi 1Q", amount: 80, type: "INTERNET" });
          pushSupply({
            name: "Suministros 1Q",
            amount: 200,
            type: "GENERAL_SUPPLIES",
          });
          pushSupply({ name: "Wifi 2Q", amount: 80, type: "INTERNET" });
          pushSupply({
            name: "Suministros 2Q",
            amount: 200,
            type: "GENERAL_SUPPLIES",
          });
        } else {
          pushSupply({
            name: `Wifi ${shortTermLabel}`,
            amount: 80,
            type: "INTERNET",
          });
          pushSupply({
            name: `Suministros ${shortTermLabel}`,
            amount: 200,
            type: "GENERAL_SUPPLIES",
          });
        }
      }

      pushSupply({
        name: "Tasa de la agencia",
        amount: 459.8,
        type: "AGENCY_FEES",
      });
      pushSupply({ name: "Limpieza Check-Out", amount: 50, type: "CLEANUP" });
    }

    await Supply.bulkCreate(supplies);
  } catch (error) {
    console.error(error);
  }
}

async function addRentPayments(room, leaseOrder, client) {
  try {
    if (room.property?.category === "HELLO_LANDLORD") {
      return;
    }

    const start = new Date(leaseOrder.startDate);
    const end = new Date(leaseOrder.endDate);

    const startYear = start.getUTCFullYear();
    const startMonth = start.getUTCMonth();
    const endYear = end.getUTCFullYear();
    const endMonth = end.getUTCMonth();

    const monthsDifference =
      (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    const monthlyPaymentsCount = monthsDifference - 1;

    const payments = [];

    for (
      let monthOffset = 1;
      monthOffset <= monthlyPaymentsCount;
      monthOffset++
    ) {
      const paymentMonth = new Date(startYear, startMonth + monthOffset);

      payments.push({
        amount: leaseOrder.price,
        type: "MONTHLY",
        paymentableId: room.id,
        paymentableType: "ROOM",
        clientId: client.id,
        leaseOrderId: leaseOrder.id,
        leaseOrderType: "ROOM",
        status: "PENDING",
        quotaNumber: monthOffset + 1,
        date: new Date(),
        ownerId: room.property.ownerId,
        paymentId: "-",
        description: `Pago mensual - ${paymentMonth
          .toLocaleString("es-ES", { month: "long" })
          .replace(/^./, (char) =>
            char.toUpperCase()
          )} ${paymentMonth.getFullYear()}`,
      });
    }

    await RentPayment.bulkCreate(payments);
  } catch (error) {
    console.error(`❌ Error generating rent payments: ${error.message}`);
  }
}

export { processReservation };
