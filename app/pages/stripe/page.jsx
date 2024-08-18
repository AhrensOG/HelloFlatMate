"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function ReservePage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    // Aquí puedes obtener roomId, userEmail y price desde tus datos
    const roomId = "12";
    const userEmail = "user@example.com";
    const price = 5000; // Precio en centavos ($50.00)

    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, userEmail, price }),
    });

    const session = await response.json();

    const stripe = await stripePromise;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Reserva tu Habitación</h1>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Redirigiendo..." : "Reservar y Pagar"}
      </button>
    </div>
  );
}
