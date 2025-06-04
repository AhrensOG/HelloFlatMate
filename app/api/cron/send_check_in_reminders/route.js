import { NextResponse } from "next/server";
import { Op } from "sequelize";
import { Client, LeaseOrderRoom } from "@/db/init";
import { sendMailFunction } from "../../sendGrid/controller/sendMailFunction";
import validateHMACToken from "@/app/libs/lib";
import { checkInReminderTemplate } from "../email_templates/reminder_templates";

const REMINDER_DAYS = [30, 25, 20, 15, 10, 5];

function differenceInDays(date1, date2) {
  const diffTime = date1.getTime() - date2.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export async function GET() {
  try {
    const token = process.env.CRON_SK;
    const secretKey = process.env.SECRET_KEY_CRON;
    const secretPassword = process.env.SECRET_PASSWORD_CRON;

    if (!token || !validateHMACToken(token, secretPassword, secretKey)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const leaseOrders = await LeaseOrderRoom.findAll({
      where: {
        isActive: true,
        status: "APPROVED",
        startDate: { [Op.gt]: now },
      },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["email", "arrivalDate", "arrivalTime"],
        },
      ],
    });

    const enviados = [];

    for (const lease of leaseOrders) {
      const diffDays = differenceInDays(new Date(lease.startDate), now);

      if (!REMINDER_DAYS.includes(diffDays)) continue;
      if (client.arrivalDate && client.arrivalTime) continue;

      const client = lease.client;
      if (!client || !client.email) continue;

      const html = checkInReminderTemplate();

      await sendMailFunction({
        to: client.email,
        subject: "Recordatorio de Check-In - helloflatmate",
        html,
      });

      enviados.push({
        email: client.email,
        leaseId: lease.id,
        startDate: lease.startDate,
        diffDays,
      });
    }

    return NextResponse.json(
      { enviados, total: enviados.length },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error en el endpoint de check-in reminder:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
