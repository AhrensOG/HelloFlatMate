import Stripe from "stripe";
import { NextResponse } from "next/server";
import { LeaseOrderProperty, LeaseOrderRoom, Payment, Supply } from "@/db/init"; // Importa el modelo Supply

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

          // Crear el Payment
          await Payment.create({
            amount: successLeaseOrderRoom.price,
            date: new Date(), // La fecha actual
            status: "APPROVED", // Estado inicial
            type: "RESERVATION",
            paymentableId: successLeaseOrderRoom.roomId,
            paymentableType: "ROOM",
            paymentId: session.id,
            clientId: successLeaseOrderRoom.clientId,
            ownerId: successLeaseOrderRoom.ownerId,
          });

          await successLeaseOrderRoom.update({
            status: "PENDING",
            inReview: true,
          });
          console.log(
            `✅ LeaseOrderRoom with ID ${leaseOrderId} updated to PENDING`
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

          // Crear el Payment
          await Payment.create({
            amount: successLeaseOrder.price,
            date: new Date(), // La fecha actual
            status: "APPROVED", // Estado inicial
            type: "RESERVATION",
            paymentableId: successLeaseOrder.propertyId,
            paymentableType: "PROPERTY",
            paymentId: session.id,
            clientId: successLeaseOrder.clientId,
            ownerId: successLeaseOrder.ownerId,
          });

          await successLeaseOrder.update({ status: "PENDING", inReview: true });
          console.log(
            `✅ LeaseOrderProperty with ID ${leaseOrderId} updated to PENDING`
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
          paymentId: session.id, // Asigna el ID del pago de Stripe
          paymentDate: new Date(), // Establece la fecha de pago actual
          status: "PAID", // Cambia el estado a 'PAID'
        });
        console.log(`✅ Supply with ID ${supplyId} updated to PAID`);
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

          // Verificar si el estado es APPROVED
          if (failedLeaseOrderRoom.status !== "APPROVED") {
            await Payment.create({
              amount: failedLeaseOrderRoom.price,
              date: new Date(), // La fecha actual
              status: "REJECTED", // Estado inicial
              type: "RESERVATION",
              paymentableId: failedLeaseOrderRoom.roomId,
              paymentableType: "ROOM",
              paymentId: session.id,
              clientId: failedLeaseOrderRoom.clientId,
              ownerId: failedLeaseOrderRoom.ownerId,
            });
            await failedLeaseOrderRoom.update({ status: "REJECTED" });
            console.log(
              `❌ LeaseOrderRoom with ID ${leaseOrderId} updated to REJECTED`
            );
          } else {
            console.log(
              `LeaseOrderRoom with ID ${leaseOrderId} is already APPROVED. No changes made.`
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

          // Verificar si el estado es APPROVED
          if (failedLeaseOrder.status !== "APPROVED") {
            await Payment.create({
              amount: failedLeaseOrder.price,
              date: new Date(), // La fecha actual
              status: "REJECTED", // Estado inicial
              type: "RESERVATION",
              paymentableId: failedLeaseOrder.propertyId,
              paymentableType: "PROPERTY",
              paymentId: session.id,
              clientId: failedLeaseOrder.clientId,
              ownerId: failedLeaseOrder.ownerId,
            });
            await failedLeaseOrder.update({ status: "REJECTED" });
            console.log(
              `❌ LeaseOrderProperty with ID ${leaseOrderId} updated to REJECTED`
            );
          } else {
            console.log(
              `LeaseOrderProperty with ID ${leaseOrderId} is already APPROVED. No changes made.`
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
