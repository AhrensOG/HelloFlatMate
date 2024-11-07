import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Client } from "@/db/init";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const {
      amount,
      type,
      paymentableId,
      paymentableType,
      clientId,
      leaseOrderId,
      leaseOrderType,
      quotaNumber,
      propertyName,
    } = await req.json();

    // Validar los datos necesarios
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than zero." },
        { status: 400 }
      );
    }
    if (
      !type ||
      !paymentableId ||
      !paymentableType ||
      !clientId ||
      !leaseOrderId ||
      !leaseOrderType ||
      !quotaNumber
    ) {
      return NextResponse.json(
        {
          error: `type / paymentableId / paymentableType / clientId / leaseOrderId / leaseOrderType / quotaNumber are undefined `,
        },
        { status: 400 }
      );
    }
    const user = await Client.findByPk(clientId);

    if (!user) {
      return NextResponse.json(
        {
          error: `User with ID ${clientId} not found`,
        },
        { status: 400 }
      );
    }
    // Crear la sesión de pago de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Pago mensual - ${
                propertyName || "Propiedad"
              } - Cuota ${quotaNumber}`,
            },
            unit_amount: amount * 100, // Convertir a centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/user/success/${paymentableId}?type=monthly`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/user/cancel`,
      customer_email: user.email || null,
      metadata: {
        amount,
        type,
        paymentableId,
        paymentableType,
        clientId,
        leaseOrderId,
        leaseOrderType,
        quotaNumber,
        paymentType: "monthly"
      },
    });

    // Respuesta con la ID de la sesión de Stripe
    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
