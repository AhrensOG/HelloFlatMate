import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
import { Client, Supply } from "@/db/init";
import { supplyTemplate } from "./emailTemplates";
import { NextResponse } from "next/server";

// 🚀 Procesador de Pagos - Mensual
async function processSupplyPayment({ order, supplyId, clientId, HFM_MAIL }) {
  try {
    // 1️⃣ Obtener Datos Relevantes
    const [client, supply] = await Promise.all([
      Client.findByPk(clientId),
      Supply.findByPk(supplyId),
    ]);

    if (!client || !supply) {
      throw new Error(`Error en datos: Client(${!client}) Supply(${!supply})`);
    }

    await supply.update({
      status: "PAID",
      paymentDate: new Date(),
      paymentId: order || "",
    });

    // 6️⃣ Enviar Correo
    await sendMailFunction({
      to: client.email,
      subject: `Pago - ${supply.name}`,
      html: supplyTemplate(client.name, client.lastName, supply.name),
      cc: HFM_MAIL,
    });

    console.log(`✅ Rent Payment with ID ${supply.id} updated to PAID`);

    return NextResponse.json(
      {
        message: "Webhook procesado correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `❌ Error en el proceso de pago de suministros: ${error.message}`
    );
    return NextResponse.json(
      {
        message: `❌ Error en el proceso de pago de suministros: ${error.message}`,
      },
      { status: 400 }
    );
  }
}

export { processSupplyPayment };
