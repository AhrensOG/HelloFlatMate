import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  Client,
  LeaseOrderProperty,
  LeaseOrderRoom,
  Payment,
  Property,
  RentPayment,
  Room,
  Supply,
} from "@/db/init"; // Importa el modelo Supply
import rentPayment from "@/db/models/rentPayment";
import { sendMailFunction } from "../../sendGrid/controller/sendMailFunction";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

// Inicializa Stripe con tu clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Este es tu webhook secret para verificar las solicitudes de Stripe
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  // Convierte el cuerpo de la solicitud a un buffer
  const buf = Buffer.from(await req.arrayBuffer());
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    // Verifica el evento usando la firma y el cuerpo de la solicitud como buffer
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const {
    type,
    data: { object: session },
  } = event;
  const { paymentType, roomId, leaseOrderId, supplyId } = session.metadata;
  const data = session.metadata;

  try {
    if (type === "checkout.session.completed") {
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

          const property = await Room.findByPk(data.roomId, {
            include: {
              model: Property,
              as: "property",
              attributes: ["ownerId"],
            },
          });
          if (!property) {
            return NextResponse.json(
              { error, message: "Paymentable / Room not found" },
              { status: 404 }
            );
          }

          const client = await Client.findOne({
            where: { email: data.userEmail },
          });
          if (!client) {
            return NextResponse.json(
              { error, message: "Client not found" },
              { status: 404 }
            );
          }

          const type =
            data.category === "HELLO_ROOM" ||
            data.category === "HELLO_COLIVING" ||
            data.category === "HELLO_LANDLORD"
              ? "ROOM"
              : "PROPERTY";

          const paymenData = {
            amount: data.price,
            type: "RESERVATION",
            paymentableId: data.roomId,
            paymentableType: type,
            clientId: client.id,
            leaseOrderId: data.leaseOrderId,
            leaseOrderType: type,
            status: "APPROVED",
            quotaNumber: 1,
            date: new Date(),
            ownerId:
              type === "PROPERTY"
                ? property.ownerId
                : property.property.ownerId,
            paymentId: session.payment_intent,
            description: "Pago reserva",
          };

          const rentPayment = await RentPayment.create(paymenData);
          await property.update({
            isActive: false,
          });

          // // Crear el Payment
          // await Payment.create({
          //   amount: successLeaseOrderRoom.price,
          //   date: new Date(), // La fecha actual
          //   status: "APPROVED", // Estado inicial
          //   type: "RESERVATION",
          //   paymentableId: successLeaseOrderRoom.roomId,
          //   paymentableType: "ROOM",
          //   paymentId: session.id,
          //   clientId: successLeaseOrderRoom.clientId,
          //   ownerId: successLeaseOrderRoom.ownerId,
          // });

          await successLeaseOrderRoom.update({
            status: "PENDING",
            inReview: true,
          });
          await sendMailFunction({
            to: client.email,
            subject: `Confirmacion de reserva - Alojamiento ${property.serial}`,
            text: `¡Gracias por confiar en hello flat mate! Puedes revisar el estado de tu reserva en la seccion "Histórico" de tu panel de usuario.`,
          });
          console.log(
            `✅ LeaseOrderRoom with ID ${leaseOrderId} updated to PENDING`
          );
          console.log(
            `✅ Reservation Payment with ID ${rentPayment.id} updated to APPROVED`
          );
        } else {
          const successLeaseOrder = await LeaseOrderProperty.findByPk(
            leaseOrderId
          );
          if (!successLeaseOrder) {
            console.error(
              `LeaseOrderProperty with ID ${leaseOrderId} not found.`
            );
            return NextResponse.json(
              { error: "LeaseOrderProperty not found" },
              { status: 404 }
            );
          }

          const property = await Property.findByPk(data.propertyId);
          if (!property) {
            return NextResponse.json(
              { error, message: "Paymentable / Property not found" },
              { status: 404 }
            );
          }

          const client = await Client.findOne({
            where: { email: data.userEmail },
          });
          if (!client) {
            return NextResponse.json(
              { error, message: "Client not found" },
              { status: 404 }
            );
          }

          const type =
            data.category === "HELLO_ROOM" ||
            data.category === "HELLO_COLIVING" ||
            data.category === "HELLO_LANDLORD"
              ? "ROOM"
              : "PROPERTY";

          const paymenData = {
            amount: data.price,
            type: "RESERVATION",
            paymentableId: data.propertyId,
            paymentableType: type,
            clientId: client.id,
            leaseOrderId: data.leaseOrderId,
            leaseOrderType: type,
            status: "APPROVED",
            quotaNumber: 1,
            date: new Date(),
            ownerId:
              type === "PROPERTY"
                ? property.ownerId
                : property.property.ownerId,
            paymentId: session.payment_intent,
            description: "Pago reserva",
          };

          const rentPayment = await RentPayment.create(paymenData);

          // // Crear el Payment
          // await Payment.create({
          //   amount: successLeaseOrder.price,
          //   date: new Date(), // La fecha actual
          //   status: "APPROVED", // Estado inicial
          //   type: "RESERVATION",
          //   paymentableId: successLeaseOrder.propertyId,
          //   paymentableType: "PROPERTY",
          //   paymentId: session.id,
          //   clientId: successLeaseOrder.clientId,
          //   ownerId: successLeaseOrder.ownerId,
          // });
          await property.update({ isActive: false });
          await successLeaseOrder.update({ status: "PENDING", inReview: true });
          await sendMailFunction({
            to: client.email,
            subject: `Confirmacion de reserva - Alojamiento ${property.serial}`,
            text: `¡Gracias por confiar en hello flat mate! Puedes revisar el estado de tu reserva en la seccion "Histórico" de tu panel de usuario.`,
          });
          console.log(
            `✅ LeaseOrderProperty with ID ${leaseOrderId} updated to PENDING`
          );
          console.log(
            `✅ Reservation Payment with ID ${rentPayment.id} updated to APPROVED`
          );
        }
      } else if (paymentType === "supply") {
        // Actualiza el estado del pago del suministro
        const successSupply = await Supply.findByPk(supplyId);
        if (!successSupply) {
          console.error(`Supply with ID ${supplyId} not found.`);
          return NextResponse.json(
            { error: "Supply not found" },
            { status: 404 }
          );
        }
        await successSupply.update({
          paymentId: session.payment_intent, // Asigna el ID del pago de Stripe
          paymentDate: new Date(), // Establece la fecha de pago actual
          status: "PAID", // Cambia el estado a 'PAID'
        });
        console.log(`✅ Supply with ID ${supplyId} updated to PAID`);
      } else if (paymentType === "monthly") {
        const property =
          data.paymentableType === "PROPERTY"
            ? await Property.findByPk(data.paymentableId)
            : await Room.findByPk(data.paymentableId, {
                include: {
                  model: Property,
                  as: "property",
                  attributes: ["ownerId"],
                },
              });
        if (!property) {
          return NextResponse.json(
            { error, message: "Paymentable not found" },
            { status: 404 }
          );
        }

        const client = await Client.findByPk(data.clientId);
        if (!client) {
          return NextResponse.json(
            { error, message: "Client not found" },
            { status: 404 }
          );
        }

        const paymenData = {
          amount: data.amount,
          type: data.type,
          paymentableId: data.paymentableId,
          paymentableType: data.paymentableType,
          clientId: data.clientId,
          leaseOrderId: data.leaseOrderId,
          leaseOrderType: data.leaseOrderType,
          status: "APPROVED",
          quotaNumber: data.quotaNumber ? data.quotaNumber : 1,
          date: new Date(),
          ownerId:
            data.paymentableType === "PROPERTY"
              ? property.ownerId
              : property.property.ownerId,
          paymentId: session.payment_intent,
          description: "Pago mensual",
        };

        const rentPayment = await RentPayment.create(paymenData);
        console.log(
          `✅ Rent Payment with ID ${rentPayment.id} updated to APPROVED`
        );
      }
    } else if (type === "checkout.session.expired") {
      if (paymentType === "reservation") {
        if (roomId !== "false") {
          const failedLeaseOrderRoom = await LeaseOrderRoom.findByPk(
            leaseOrderId
          );
          if (!failedLeaseOrderRoom) {
            console.error(`LeaseOrderRoom with ID ${leaseOrderId} not found.`);
            return NextResponse.json(
              { error: "LeaseOrderRoom not found" },
              { status: 404 }
            );
          }
          const property = await Room.findByPk(data.roomId, {
            include: {
              model: Property,
              as: "property",
              attributes: ["ownerId"],
            },
          });
          if (!property) {
            return NextResponse.json(
              { error, message: "Paymentable / Room not found" },
              { status: 404 }
            );
          }

          const client = await Client.findOne({
            where: { email: data.userEmail },
          });
          if (!client) {
            return NextResponse.json(
              { error, message: "Client not found" },
              { status: 404 }
            );
          }

          const type =
            data.category === "HELLO_ROOM" ||
            data.category === "HELLO_COLIVING" ||
            data.category === "HELLO_LANDLORD"
              ? "ROOM"
              : "PROPERTY";

          // Verificar si el estado es APPROVED
          if (failedLeaseOrderRoom.status === "IN_PROGRESS") {
            const paymenData = {
              amount: data.price,
              type: "RESERVATION",
              paymentableId: data.roomId,
              paymentableType: type,
              clientId: client.id,
              leaseOrderId: data.leaseOrderId,
              leaseOrderType: type,
              status: "REJECTED",
              quotaNumber: 1,
              date: new Date(),
              ownerId:
                type === "PROPERTY"
                  ? property.ownerId
                  : property.property.ownerId,
              paymentId: session.payment_intent,
              description: "Pago reserva",
            };

            const rentPayment = await RentPayment.create(paymenData);
            // await Payment.create({
            //   amount: failedLeaseOrderRoom.price,
            //   date: new Date(), // La fecha actual
            //   status: "REJECTED", // Estado inicial
            //   type: "RESERVATION",
            //   paymentableId: failedLeaseOrderRoom.roomId,
            //   paymentableType: "ROOM",
            //   paymentId: session.id,
            //   clientId: failedLeaseOrderRoom.clientId,
            //   ownerId: failedLeaseOrderRoom.ownerId,
            // });
            await property.update({ status: "FREE" });
            await failedLeaseOrderRoom.update({ status: "REJECTED" });
            console.log(
              `❌ LeaseOrderRoom with ID ${leaseOrderId} updated to REJECTED`
            );
            console.log(
              `❌ Reservation Payment with ID ${rentPayment.id} updated to REJECTED`
            );
          } else {
            console.log(
              `LeaseOrderRoom with ID ${leaseOrderId} is already APPROVED. No changes made.`
            );
            console.log(
              `Reservation Payment with ID ${rentPayment.id} is not IN_PROGRESS. No changes made`
            );
          }
        } else {
          const failedLeaseOrder = await LeaseOrderProperty.findByPk(
            leaseOrderId
          );
          if (!failedLeaseOrder) {
            console.error(
              `LeaseOrderProperty with ID ${leaseOrderId} not found.`
            );
            return NextResponse.json(
              { error: "LeaseOrderProperty not found" },
              { status: 404 }
            );
          }
          const property = await Property.findByPk(data.propertyId);
          if (!property) {
            return NextResponse.json(
              { error, message: "Paymentable / Property not found" },
              { status: 404 }
            );
          }

          const client = await Client.findOne({
            where: { email: data.userEmail },
          });
          if (!client) {
            return NextResponse.json(
              { error, message: "Client not found" },
              { status: 404 }
            );
          }

          const type =
            data.category === "HELLO_ROOM" ||
            data.category === "HELLO_COLIVING" ||
            data.category === "HELLO_LANDLORD"
              ? "ROOM"
              : "PROPERTY";

          // Verificar si el estado es APPROVED
          if (failedLeaseOrder.status === "IN_PROGRESS") {
            const paymenData = {
              amount: data.price,
              type: "RESERVATION",
              paymentableId: data.propertyId,
              paymentableType: type,
              clientId: client.id,
              leaseOrderId: data.leaseOrderId,
              leaseOrderType: type,
              status: "REJECTED",
              quotaNumber: 1,
              date: new Date(),
              ownerId:
                type === "PROPERTY"
                  ? property.ownerId
                  : property.property.ownerId,
              paymentId: session.payment_intent,
              description: "Pago reserva",
            };

            const rentPayment = await RentPayment.create(paymenData);

            // await Payment.create({
            //   amount: failedLeaseOrder.price,
            //   date: new Date(), // La fecha actual
            //   status: "REJECTED", // Estado inicial
            //   type: "RESERVATION",
            //   paymentableId: failedLeaseOrder.propertyId,
            //   paymentableType: "PROPERTY",
            //   paymentId: session.id,
            //   clientId: failedLeaseOrder.clientId,
            //   ownerId: failedLeaseOrder.ownerId,
            // });
            await property.update({ status: "FREE" });
            await failedLeaseOrder.update({ status: "REJECTED" });
            console.log(
              `❌ LeaseOrderProperty with ID ${leaseOrderId} updated to REJECTED`
            );
            console.log(
              `❌ Reservation Payment with ID ${rentPayment.id} updated to REJECTED`
            );
          } else {
            console.log(
              `LeaseOrderProperty with ID ${leaseOrderId} is already APPROVED. No changes made.`
            );
            console.log(
              `Reservation Payment with ID ${rentPayment.id} is not IN_PROGRESS. No changes made`
            );
          }
        }
      } else if (paymentType === "supply") {
        const failedSupply = await Supply.findByPk(supplyId);
        if (!failedSupply) {
          console.error(`Supply with ID ${supplyId} not found.`);
          return NextResponse.json(
            { error: "Supply not found" },
            { status: 404 }
          );
        }
        await failedSupply.update({
          status: "NOT_PAID",
        });
        console.log(`❌ Supply with ID ${supplyId} updated to NOT_PAID`);
      } else if (paymentType === "monthly") {
        console.log(`❌ Rent Payment expired`);
      }
    } else {
      console.log(`Unhandled event type ${type}`);
    }
  } catch (err) {
    console.error(`❌ Error processing event ${type}: ${err.message}`);
    return NextResponse.json(
      { error: `Error processing event: ${err.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
