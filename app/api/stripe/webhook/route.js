import Stripe from "stripe";
import { NextResponse } from "next/server";

// Inicializa Stripe con tu clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Este es tu webhook secret para verificar las solicitudes de Stripe
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false, // Desactiva el body parser de Next.js
  },
};

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

  // Maneja el evento específico
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      console.log(
        `✅ Payment for session completed:`,
        checkoutSessionCompleted
      );
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      console.log(`❌ Payment session expired:`, checkoutSessionExpired);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Responde con un 200 para confirmar que el webhook fue recibido correctamente
  return NextResponse.json({ received: true }, { status: 200 });
}
