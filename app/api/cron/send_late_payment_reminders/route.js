import { NextResponse } from "next/server";
import { Op } from "sequelize";
import { Client, LeaseOrderRoom, RentPayment } from "@/db/init";
import validateHMACToken from "@/app/libs/lib";
import { latePaymentReminderTemplate } from "../email_templates/reminder_templates";
import { sendMailFunction } from "../../sendGrid/controller/sendMailFunction";

function addMonthsToDate(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function differenceInMonths(date1, date2) {
  return (
    (date1.getFullYear() - date2.getFullYear()) * 12 +
    (date1.getMonth() - date2.getMonth())
  );
}

export async function GET() {
  try {
    const secretKey = process.env.SECRET_KEY_CRON;
    const secretPassword = process.env.SECRET_PASSWORD_CRON;
    const token = process.env.CRON_SK;

    if (!token || !validateHMACToken(token, secretPassword, secretKey)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const todayDay = now.getDate();
    const todayMonth = now.getMonth() + 1;

    if (todayDay !== 26) {
      return NextResponse.json(
        {
          message:
            "Hoy no es día 26, no se envían recordatorios de vencimiento",
        },
        { status: 200 }
      );
    }

    const leaseOrders = await LeaseOrderRoom.findAll({
      where: {
        isActive: true,
        startDate: { [Op.lte]: now },
        endDate: { [Op.gte]: now },
      },
      attributes: ["id", "startDate", "endDate"],
    });

    if (!leaseOrders.length) {
      return NextResponse.json(
        { message: "No hay contratos activos" },
        { status: 200 }
      );
    }

    const leaseOrderIds = leaseOrders.map((l) => l.id);

    const clients = await Client.findAll({
      include: [
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          where: { id: { [Op.in]: leaseOrderIds } },
        },
        {
          model: RentPayment,
          as: "rentPayments",
          where: { leaseOrderId: { [Op.in]: leaseOrderIds } },
          required: false,
        },
      ],
    });

    const resultados = [];

    // for (const client of clients) {
    //   const lease = client.leaseOrdersRoom?.[0];
    //   if (!lease || !lease.startDate || !lease.endDate) continue;

    //   const leaseStart = new Date(lease.startDate);
    //   const leaseEnd = new Date(lease.endDate);

    //   if (isNaN(leaseStart.getTime()) || isNaN(leaseEnd.getTime())) continue;

    //   const nextMonth = addMonthsToDate(now, 1);
    //   const expectedQuota = differenceInMonths(nextMonth, leaseStart) + 1;

    //   const pendingRent = client.rentPayments.find(
    //     (p) =>
    //       p.leaseOrderId === lease.id &&
    //       p.quotaNumber === expectedQuota &&
    //       p.status === "PENDING"
    //   );

    //   if (pendingRent && client.email) {
    //     const subject = "Recordatorio de pago vencido - helloFlatmate";
    //     const html = latePaymentReminderTemplate();

    //     // Descomentar para enviar correos reales

    //     await sendMailFunction({
    //       to: client.email,
    //       subject,
    //       html,
    //     });

    //     resultados.push({
    //       emailDestino: client.email,
    //       leaseId: lease.id,
    //       testSubject: subject,
    //       testHtmlPreview: html.slice(0, 100) + "...", // solo muestra el inicio del mensaje
    //     });
    //   }
    // }

    return NextResponse.json(
      {
        totalEmails: resultados.length,
        enviados: resultados,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error al ejecutar send_late_payment_reminders:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
