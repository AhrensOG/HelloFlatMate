// app/api/redsys/notification/route.js

import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import {
  Client,
  LeaseOrderRoom,
  RentPayment,
  Room,
  Property,
  Supply,
} from "@/db/init";
import { billBuilder } from "../../pdf_creator/utils/billBuilder";
import { sendMailFunction } from "../../sendGrid/controller/sendMailFunction";
import {
  createMerchantSignatureNotif,
  decodeBase64,
  decodeHtmlEntities,
} from "./utils/functions";

const { MERCHANT_KEY_BASE64, HFM_MAIL } = process.env;

function formatDate(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function POST(request) {
  try {
    // 1) Capturar parámetros de Redsys (POST form-data)
    const formData = await request.formData();
    const version = formData.get("Ds_SignatureVersion");
    const params = formData.get("Ds_MerchantParameters");
    let signatureReceived = formData.get("Ds_Signature");

    // Normalizar firma si hay "+" convertidos en espacios
    if (signatureReceived) {
      signatureReceived = signatureReceived.replace(" ", "+");
    }

    // 2) Decodificar params para inspeccionarlo
    const decodedParamsWA = decodeBase64(params); // WordArray
    const decodedParamsJSON = CryptoJS.enc.Utf8.stringify(decodedParamsWA);
    const decodedParams = JSON.parse(decodedParamsJSON);

    // 3) Calcular firma
    const signatureCalculated = createMerchantSignatureNotif(
      MERCHANT_KEY_BASE64,
      params
    );

    // Normalizar firma recibida (URL-safe base64 => base64 clásico)
    let normalizedSignatureReceived = signatureReceived
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    while (normalizedSignatureReceived.length % 4 !== 0) {
      normalizedSignatureReceived += "=";
    }

    // 4) Comparar firmas
    if (signatureCalculated !== normalizedSignatureReceived) {
      console.log("Notificación Redsys firma inválida");
      return NextResponse.json({ error: "Firma KO" }, { status: 400 });
    }

    // ---------------- FIRMA OK -----------------
    // Revisar si la operación fue aprobada o denegada:
    const dsResponseCode = parseInt(decodedParams.Ds_Response, 10);
    // 0..99 => Aprobado
    if (dsResponseCode < 0 || dsResponseCode > 99) {
      // Pagos >= 100 => denegados
      console.log(`❌ Payment denied. Ds_Response: ${dsResponseCode}`);
      // Podrías marcar algo en BBDD, o simplemente loguear
      return NextResponse.json({ message: "Pago denegado" }, { status: 200 });
    }

    // Si llegamos aquí, => dsResponseCode está entre 0 y 99 => Aprobado
    console.log(`✅ Payment approved. Ds_Response = ${dsResponseCode}`);

    // 5) Leer metadata (en Ds_MerchantData)
    // Recordemos que la guardaste en la reserva en Base64
      const merchantDataB64 = decodedParams.Ds_MerchantData;
    // A veces Redsys escapa & #..., por eso primero:
    const unescaped = decodeHtmlEntities(merchantDataB64);
    // luego Base64 decode:
    const merchantDataString = Buffer.from(unescaped, "base64").toString(
      "utf8"
    );
    const metadata = JSON.parse(merchantDataString);

    // De tu webhook Stripe, leías algo como:
    // { paymentType, roomId, leaseOrderId, supplyId, category, userEmail, price, ... }
    const {
      order,
      paymentType,
      roomId,
      leaseOrderId,
      supplyId,
      category,
      userEmail,
      price, // en caso de que lo hayas puesto
    } = metadata;

    // 6) Replicar lógica Stripe: "reservation", "supply", "monthly"
    if (paymentType === "reservation") {
      if (roomId !== "false") {
        const successLeaseOrderRoom = await LeaseOrderRoom.findByPk(
          leaseOrderId
        );
        if (!successLeaseOrderRoom) {
          console.error(`LeaseOrderRoom with ID ${leaseOrderId} not found.`);
          return NextResponse.json(
            { error: "LeaseOrderRoom not found" },
            { status: 404 }
          );
        }

        // Busca la room (con property dentro) para info
        const theRoom = await Room.findByPk(roomId, {
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
        });

        if (!theRoom) {
          console.error(`Room with ID ${roomId} not found.`);
          return NextResponse.json(
            { error: "Room not found" },
            { status: 404 }
          );
        }

        const client = await Client.findOne({ where: { email: userEmail } });

        if (!client) {
          return NextResponse.json(
            { error: "Client not found" },
            { status: 404 }
          );
        }

        const type =
          category === "HELLO_ROOM" ||
          category === "HELLO_COLIVING" ||
          category === "HELLO_LANDLORD"
            ? "ROOM"
            : "PROPERTY";

        const amountNumber = Number(price) || 0;

        const rentData = {
          amount: amountNumber, // si lo guardaste en EUR
          type: "RESERVATION",
          paymentableId: roomId,
          paymentableType: type,
          clientId: client.id,
          leaseOrderId: leaseOrderId,
          leaseOrderType: type,
          status: "APPROVED",
          quotaNumber: 1,
          date: new Date(),
          ownerId: theRoom.property.ownerId,
          paymentId: decodedParams.Ds_AuthorisationCode || order || "", // Redsys no siempre da un code
          description: "Pago reserva (Redsys)",
        };

        const rentPayment = await RentPayment.create(rentData);

        // Desactivar la room
        await theRoom.update({ isActive: false });

        // Actualizar la leaseOrderRoom
        await successLeaseOrderRoom.update({ status: "APPROVED" });

        // Generar PDF
        const detailsPayments = [
          {
            amount: rentPayment.amount,
            date: rentPayment.date,
            status: rentPayment.status,
            id: rentPayment.id,
            quotaNumber: rentPayment.quotaNumber,
          },
        ];
        const pdfData = {
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
          details: detailsPayments,
          totalAmount: detailsPayments.reduce(
            (total, p) => total + p.amount,
            0
          ),
          returnBytes: true,
        };

        const pdfBytes = await billBuilder(pdfData);
        const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

        // Enviar mail a client
        await sendMailFunction({
          to: client.email,
          subject: `Confirmación de reserva - Alojamiento ${theRoom.serial}`,
          text: `¡Gracias por confiar en helloflatmate! Puedes revisar el estado de tu reserva en la sección "Histórico" de tu panel de usuario.`,
          attachments: [
            {
              content: pdfBase64,
              filename: `factura_${rentPayment.id}.pdf`,
              type: "application/pdf",
              disposition: "attachment",
            },
          ],
        });

        // Enviar mail a HFM
        await sendMailFunction({
          to: HFM_MAIL,
          subject: `Pago de reserva - ${theRoom.serial}`,
          text: `El usuario ${client.name} ${client.lastName} realizó el pago de reserva por el alojamiento ${theRoom.serial}.`,
          attachments: [
            {
              content: pdfBase64,
              filename: `factura_${rentPayment.id}.pdf`,
              type: "application/pdf",
              disposition: "attachment",
            },
          ],
        });

        console.log(
          `✅ LeaseOrderRoom with ID ${leaseOrderId} updated to APPROVED`
        );
        console.log(
          `✅ Reservation Payment with ID ${rentPayment.id} updated to APPROVED`
        );
      }
    } else if (paymentType === "supply") {
      const successSupply = await Supply.findByPk(supplyId);
      if (!successSupply) {
        console.error(`Supply with ID ${supplyId} not found.`);
        return NextResponse.json(
          { error: "Supply not found" },
          { status: 404 }
        );
      }
      await successSupply.update({
        paymentId: decodedParams.Ds_AuthorisationCode || order || "",
        paymentDate: new Date(),
        status: "PAID",
      });
      console.log(`✅ Supply with ID ${supplyId} updated to PAID`);
    } else if (paymentType === "monthly") {
      const {
        paymentableType,
        paymentableId,
        clientId,
        leaseOrderType,
        leaseOrderId,
        quotaNumber,
        amount,
        month,
        propertySerial,
      } = metadata;
      let ownerId = null;

      if (paymentableType === "PROPERTY") {
        const foundProperty = await Property.findByPk(paymentableId);
        if (!foundProperty) {
          return NextResponse.json(
            { error: "Paymentable not found" },
            { status: 404 }
          );
        }
        ownerId = foundProperty.ownerId;
      } else {
        // es ROOM
        const foundRoom = await Room.findByPk(paymentableId, {
          include: {
            model: Property,
            as: "property",
            attributes: ["ownerId"],
          },
        });
        if (!foundRoom) {
          return NextResponse.json(
            { error: "Room not found" },
            { status: 404 }
          );
        }
        ownerId = foundRoom.property.ownerId;
      }

      const client = await Client.findByPk(clientId);
      if (!client) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }

      const rentData = {
        amount: Number(amount),
        type: "MONTHLY",
        paymentableId,
        paymentableType,
        clientId,
        leaseOrderId,
        leaseOrderType,
        status: "APPROVED",
        quotaNumber,
        date: new Date(),
        ownerId,
        paymentId: decodedParams.Ds_AuthorisationCode || order || "",
        description: `Pago mensual - ${month}`,
      };

      const rentPayment = await RentPayment.create(rentData);

      // Enviar mail a client
      await sendMailFunction({
        to: client.email,
        subject: `Confirmación de pago mensual - Alojamiento ${propertySerial}`,
        text: `¡Gracias por confiar en HelloFlatMate! 
        Puedes descargar tu factura directamente desde la aplicación (helloflatmate.com). 
        Basta con dirigirte a “Panel” y, en la sección “Mis finanzas”, podrás descargarla.`,
      });

      // Enviar mail a HFM
      await sendMailFunction({
        to: HFM_MAIL,
        subject: `Pago mensual realizado - ${propertySerial}`,
        text: `El usuario ${client.name} ${client.lastName} realizó el pago de reserva por el alojamiento ${propertySerial}.`,
      });

      console.log(
        `✅ Rent Payment with ID ${rentPayment.id} updated to APPROVED`
      );
    } else {
      // No coincidió con ninguno => log
      console.log(`Unhandled paymentType: ${paymentType}`);
    }

    // Responde 200 si todo OK
    return NextResponse.json(
      { message: "Notificación Redsys procesada" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error procesando notificación Redsys:", err);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
