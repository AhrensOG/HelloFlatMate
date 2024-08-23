import Stripe from "stripe";
import { NextResponse } from "next/server";
import { LeaseOrderProperty, LeaseOrderRoom } from "@/db/init";

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

  // Destructura la metadata
  const { type, data: { object: session } } = event;
  const { roomId, leaseOrderId } = session.metadata;

  // Maneja el evento específico
  try {
    if (type === "checkout.session.completed") {
      if (roomId) {
        // Actualiza el estado de LeaseOrderRoom
        const successLeaseOrderRoom = await LeaseOrderRoom.findByPk(leaseOrderId);
        if (!successLeaseOrderRoom) {
          console.error(`LeaseOrderRoom with ID ${leaseOrderId} not found.`);
          return NextResponse.json({ error: "LeaseOrderRoom not found" }, { status: 404 });
        }
        await successLeaseOrderRoom.update({ status: "PENDING" });
        console.log(`✅ LeaseOrderRoom with ID ${leaseOrderId} updated to PENDING`);
      } else {
        // Actualiza el estado de LeaseOrderProperty
        const successLeaseOrder = await LeaseOrderProperty.findByPk(leaseOrderId);
        if (!successLeaseOrder) {
          console.error(`LeaseOrderProperty with ID ${leaseOrderId} not found.`);
          return NextResponse.json({ error: "LeaseOrderProperty not found" }, { status: 404 });
        }
        await successLeaseOrder.update({ status: "PENDING" });
        console.log(`✅ LeaseOrderProperty with ID ${leaseOrderId} updated to PENDING`);
      }
    } else if (type === "checkout.session.expired") {
      if (roomId) {
        // Actualiza el estado de LeaseOrderRoom a REJECTED
        const failedLeaseOrderRoom = await LeaseOrderRoom.findByPk(leaseOrderId);
        if (!failedLeaseOrderRoom) {
          console.error(`LeaseOrderRoom with ID ${leaseOrderId} not found.`);
          return NextResponse.json({ error: "LeaseOrderRoom not found" }, { status: 404 });
        }
        await failedLeaseOrderRoom.update({ status: "REJECTED" });
        console.log(`❌ LeaseOrderRoom with ID ${leaseOrderId} updated to REJECTED`);
      } else {
        // Actualiza el estado de LeaseOrderProperty a REJECTED
        const failedLeaseOrder = await LeaseOrderProperty.findByPk(leaseOrderId);
        if (!failedLeaseOrder) {
          console.error(`LeaseOrderProperty with ID ${leaseOrderId} not found.`);
          return NextResponse.json({ error: "LeaseOrderProperty not found" }, { status: 404 });
        }
        await failedLeaseOrder.update({ status: "REJECTED" });
        console.log(`❌ LeaseOrderProperty with ID ${leaseOrderId} updated to REJECTED`);
      }
    } else {
      console.log(`Unhandled event type ${type}`);
    }
  } catch (err) {
    console.error(`❌ Error processing event ${type}: ${err.message}`);
    return NextResponse.json({ error: `Error processing event: ${err.message}` }, { status: 500 });
  }

  // Responde con un 200 para confirmar que el webhook fue recibido correctamente
  return NextResponse.json({ received: true }, { status: 200 });
}
