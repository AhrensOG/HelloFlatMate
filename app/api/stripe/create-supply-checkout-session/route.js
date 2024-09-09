import Stripe from "stripe";
import { NextResponse } from "next/server";

// Inicializa Stripe con tu clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Extrae los parámetros que se recibirán en la solicitud
    const { supplyId, supplyName, userEmail, price } = await req.json();

    // Crea la sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur", // Define la moneda
            product_data: {
              name: `Pago de: ${supplyName}`, // Nombre del suministro
            },
            unit_amount: price, // El precio en centavos (5000 = €50.00)
          },
          quantity: 1, // Cantidad de artículos, en este caso 1
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/user/success/${supplyId}?type=supply`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/user/cancel`,
      customer_email: userEmail, // Correo del cliente
      metadata: {
        supplyId, // Almacenar metadatos para referencias futuras
        supplyName,
        price,
        userEmail,
        paymentType: "supply",
      },
    });

    // Devuelve la ID de la sesión de Stripe
    return NextResponse.json({ id: session.id });
  } catch (error) {
    // Manejo de errores en caso de que falle la creación de la sesión
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
