// app/pago/page.js
"use client";
import { useState } from "react";

export default function PagoPage() {
  const [checkoutData, setCheckoutData] = useState(null);

  const handleCheckout = async () => {
    // Simulando datos
    const orderId = String(Date.now()); // Generar "número de pedido" único
    const body = {
      amount: 145, // 1,45 €
      order: "1446068586",
      urlOk: "http://localhost:3000/redsys",
      urlKo: "http://localhost:3000/pages/user/cancel",
      merchantUrl: "https://d27b-84-123-201-36.ngrok-free.app/api/redsys/webhook", // notificación online
    };

    // Llamar a nuestro endpoint que genera la firma
    const res = await fetch("/api/redsys/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data)
    setCheckoutData(data);
  };

  return (
    <div>
      <h1>Pago con Redsys</h1>
      {!checkoutData && (
        <button onClick={handleCheckout}>Generar formulario Redsys</button>
      )}

      {checkoutData && (
        <form name="redsysForm" action={checkoutData.redsysUrl} method="POST">
          <input
            type="hidden"
            name="Ds_SignatureVersion"
            value={checkoutData.Ds_SignatureVersion}
          />
          <input
            type="hidden"
            name="Ds_MerchantParameters"
            value={checkoutData.Ds_MerchantParameters}
          />
          <input
            type="hidden"
            name="Ds_Signature"
            value={checkoutData.Ds_Signature}
          />

          {/* Este botón dispara el POST hacia Redsys */}
          <button type="submit">Pagar con Redsys</button>
        </form>
      )}
    </div>
  );
}
