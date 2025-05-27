import { Op } from "sequelize";
import { LeaseOrderRoom, Room } from "@/db/init";
import { NextResponse } from "next/server";

function formatPeriod(startDate, endDate) {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Madrid",
  });

  return `Del ${formatter.format(startDate)} al ${formatter.format(endDate)}`;
}

export async function getRentalPeriodsForFilterPage() {
  try {
    const maxMonthsAgo = 2;

    const today = new Date();
    const minStartDate = new Date(today);
    minStartDate.setMonth(minStartDate.getMonth() - maxMonthsAgo);
    minStartDate.setHours(0, 0, 0, 0);

    console.log("🕒 minStartDate:", minStartDate.toISOString());

    const leaseOrders = await LeaseOrderRoom.findAll({
      attributes: ["startDate", "endDate"],
      where: {
        startDate: {
          [Op.gte]: minStartDate,
        },
      },
      include: [
        {
          model: Room,
          as: "room",
          attributes: ["isActive"],
          where: {
            isActive: true,
          },
        },
      ],
    });

    console.log("🔎 LeaseOrders encontrados:", leaseOrders.length);

    const formattedPeriods = leaseOrders.map(({ startDate, endDate }) =>
      formatPeriod(new Date(startDate), new Date(endDate))
    );

    const uniquePeriods = Array.from(new Set(formattedPeriods));

    return NextResponse.json(uniquePeriods, { status: 200 });
  } catch (error) {
    console.error("Error al obtener períodos de renta:", error);
    return NextResponse.json(
      { error: "Error al obtener períodos de renta" },
      { status: 500 }
    );
  }
}
