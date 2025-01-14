import validateHMACToken from "@/app/libs/lib";
import { LeaseOrderRoom, Supply } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function GET() {
  try {
    const secretKey = process.env.SECRET_KEY_CRON;
    const secretPassword = process.env.SECRET_PASSWORD_CRON;
    const token = process.env.CRON_SK;

    if (!token) {
      return NextResponse.json(
        { error: "Token not provided" },
        { status: 401 }
      );
    }

    if (!validateHMACToken(token, secretPassword, secretKey)) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const now = new Date();
    const thresholdDate = new Date();
    thresholdDate.setMonth(thresholdDate.getMonth() + 1);
    thresholdDate.setDate(thresholdDate.getDate() + 5);

    const leaseOrders = await LeaseOrderRoom.findAll({
      where: {
        isActive: true,
        endDate: {
          [Op.between]: [now, thresholdDate],
        },
      },
    });

    if (leaseOrders.length === 0) {
      return NextResponse.json(
        { message: "No lease orders nearing expiration" },
        { status: 200 }
      );
    }

    const suppliesToAdd = [];
    for (const leaseOrder of leaseOrders) {
      const existingSupply = await Supply.findOne({
        where: {
          leaseOrderId: leaseOrder.id,
          type: "CLEANUP",
        },
      });

      if (!existingSupply) {
        suppliesToAdd.push({
          name: "Limpieza Check-Out",
          type: "CLEANUP",
          amount: 50,
          date: new Date(),
          expirationDate: new Date(),
          status: "PENDING",
          leaseOrderId: leaseOrder.id,
          leaseOrderType: "ROOM",
          propertyId: leaseOrder.propertyId,
          clientId: leaseOrder.clientId,
        });
      }
    }

    if (suppliesToAdd.length > 0) {
      await Supply.bulkCreate(suppliesToAdd);
    }

    return NextResponse.json(
      {
        message:
          suppliesToAdd.length > 0
            ? "Supplies added for expiring lease orders"
            : "No new supplies needed",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
