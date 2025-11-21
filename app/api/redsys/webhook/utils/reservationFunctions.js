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
            "zone",
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

    // 5️⃣ Enviar Correo

    const address = {
      street: theRoom?.property?.street,
      streetNumber: theRoom?.property?.streetNumber,
      floor: theRoom?.property?.door || "",
    };

    const email_startDate = new Date(successLeaseOrderRoom.startDate);
    const email_endDate = new Date(successLeaseOrderRoom.endDate);

    const formattedStartDate = email_startDate.toLocaleDateString("es-ES", {
      timeZone: "Europe/Madrid",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedEndDate = email_endDate.toLocaleDateString("es-ES", {
      timeZone: "Europe/Madrid",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    await sendMailFunction({
      to: client.email,
      subject: `¡Reserva realizada correctamente! Alojamiento ${theRoom.serial}`,
      html: reservationTemplate(
        client.name,
        client.lastName,
        theRoom.serial,
        successLeaseOrderRoom.price,
        formattedStartDate,
        formattedEndDate,
        address
      ),
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

    const isMoncada = room.property?.zone === "Moncada";

    const getSupplyAmount = (type, quarter) => {
      if (isMoncada) {
        if (type === "GENERAL_SUPPLIES") {
          return 220;
        }
        if (type === "INTERNET") {
          return quarter === "2Q" ? 96 : 80;
        }
      }
      return type === "GENERAL_SUPPLIES" ? 200 : 80;
    };

    if (room.property?.category === "HELLO_LANDLORD") {
      pushSupply({ name: "Depósito", amount: 300, type: "DEPOSIT" });
      pushSupply({
        name: "Tasa de la agencia",
        amount: 459.8,
        type: "AGENCY_FEES",
      });
      pushSupply({
        name: `Wifi ${shortTermLabel}`,
        amount: getSupplyAmount("INTERNET", shortTermLabel),
        type: "INTERNET",
      });
      pushSupply({
        name: `Suministros ${shortTermLabel}`,
        amount: getSupplyAmount("GENERAL_SUPPLIES", shortTermLabel),
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
            amount: getSupplyAmount("GENERAL_SUPPLIES", "1Q"),
            type: "GENERAL_SUPPLIES",
          });
          pushSupply({
            name: "Suministros 2Q",
            amount: getSupplyAmount("GENERAL_SUPPLIES", "2Q"),
            type: "GENERAL_SUPPLIES",
          });
        } else {
          pushSupply({
            name: `Suministros ${shortTermLabel}`,
            amount: getSupplyAmount("GENERAL_SUPPLIES", shortTermLabel),
            type: "GENERAL_SUPPLIES",
          });
        }
      } else {
        if (isLongTerm) {
          pushSupply({
            name: "Wifi 1Q",
            amount: getSupplyAmount("INTERNET", "1Q"),
            type: "INTERNET",
          });
          pushSupply({
            name: "Suministros 1Q",
            amount: getSupplyAmount("GENERAL_SUPPLIES", "1Q"),
            type: "GENERAL_SUPPLIES",
          });
          pushSupply({
            name: "Wifi 2Q",
            amount: getSupplyAmount("INTERNET", "2Q"),
            type: "INTERNET",
          });
          pushSupply({
            name: "Suministros 2Q",
            amount: getSupplyAmount("GENERAL_SUPPLIES", "2Q"),
            type: "GENERAL_SUPPLIES",
          });
        } else {
          pushSupply({
            name: `Wifi ${shortTermLabel}`,
            amount: getSupplyAmount("INTERNET", shortTermLabel),
            type: "INTERNET",
          });
          pushSupply({
            name: `Suministros ${shortTermLabel}`,
            amount: getSupplyAmount("GENERAL_SUPPLIES", shortTermLabel),
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

export { processReservation, addSupplies, addRentPayments };
