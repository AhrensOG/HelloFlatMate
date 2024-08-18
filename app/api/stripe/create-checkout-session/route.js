import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { roomId, userEmail, price } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Reserva de Habitación ${roomId}`,
            },
            unit_amount: price, // El precio debe ser en centavos (5000 = $50.00)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/cancel`,
      customer_email: userEmail,
      metadata: {
        hola: 12
      }
    });
    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
