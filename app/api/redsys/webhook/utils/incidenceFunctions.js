import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
import { Incidence, Owner } from "@/db/init";
import { incidenceTemplate } from "./emailTemplates";
import { NextResponse } from "next/server";

// 🚀 Procesador de Pagos - Mensual
async function processIncidencePayment({ order, incidenceId, HFM_MAIL }) {
  try {
    // 1️⃣ Obtener Datos Relevantes
    const incidence = await Incidence.findByPk(incidenceId);

    if (!incidence) {
      throw new Error(`Error en datos: Incidence(${!incidence})`);
    }

    const owner = await Owner.findByPk(incidence.ownerId);

    if (!owner) {
      throw new Error(`Error en datos: Owner(${!owner})`);
    }

    await incidence.update({
      status: "APPROVED",
      paymentDate: new Date(),
      paymentId: order || "",
    });

    // 6️⃣ Enviar Correo
    await sendMailFunction({
      to: "ahrensgabriel09@gmail.com",
      subject: `Pago incidencia- ${incidence.title}`,
      html: incidenceTemplate(incidence.title),
      cc: HFM_MAIL,
    });

    console.log(`✅ Incidence Payment with ID ${incidence.id} updated to APPROVED`);

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

export { processIncidencePayment };
