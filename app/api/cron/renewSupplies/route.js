import validateHMACToken from "@/app/libs/lib";
import { LeaseOrderRoom, Supply, Property, Room } from "@/db/init";
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

    const leaseOrders = await LeaseOrderRoom.findAll({
      where: {
        isActive: true,
        endDate: { [Op.gte]: now },
      },
      include: [
        {
          model: Property,
          as: "property",
          attributes: ["category", "serial"],
        },
        {
          model: Room,
          as: "room",
          attributes: ["serial"],
        },
      ],
    });

    if (leaseOrders.length === 0) {
      return NextResponse.json(
        { message: "No lease orders found" },
        { status: 200 }
      );
    }

    const suppliesToAdd = [];

    let updatedCount = 0;

    for (const leaseOrder of leaseOrders) {
      const startDate = new Date(leaseOrder.startDate);
      const endDate = new Date(leaseOrder.endDate);

      const totalDurationInMonths =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        endDate.getMonth() -
        startDate.getMonth() +
        1;

      if (totalDurationInMonths <= 9) {
        continue;
      }

      const middleDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + Math.floor(totalDurationInMonths / 2),
        startDate.getDate()
      );

      const earliestCleanupDate = new Date(
        middleDate.getFullYear(),
        middleDate.getMonth() - 1,
        middleDate.getDate() - 5
      );

      if (now < earliestCleanupDate) {
        continue;
      }

      const existingSupplies = await Supply.findAll({
        where: {
          leaseOrderId: leaseOrder.id,
          type: { [Op.in]: ["GENERAL_SUPPLIES", "INTERNET"] },
        },
      });

      const generalSuppliesCount = existingSupplies.filter(
        (supply) => supply.type === "GENERAL_SUPPLIES"
      ).length;

      const internetSuppliesCount = existingSupplies.filter(
        (supply) => supply.type === "INTERNET"
      ).length;

      const isHelloColiving =
        leaseOrder.property &&
        leaseOrder.property.category === "HELLO_COLIVING";

      const isSpecialSerial = ["ZSV53P1", "ZPS57P19", "ZCDN9P2"].includes(
        leaseOrder.property?.serial
      );

      const generalSuppliesAmount = isSpecialSerial ? 220 : 200;
      const internetSuppliesAmount = isSpecialSerial ? 96 : 80;

      if (generalSuppliesCount < 2) {
        suppliesToAdd.push({
          name: generalSuppliesCount === 0 ? "Suministros" : "Suministros 2Q",
          type: "GENERAL_SUPPLIES",
          amount: generalSuppliesAmount,
          date: new Date(),
          expirationDate: new Date(),
          status: "PENDING",
          leaseOrderId: leaseOrder.id,
          leaseOrderType: "ROOM",
          propertyId: leaseOrder.propertyId,
          clientId: leaseOrder.clientId,
        });
      }

      if (!isHelloColiving && internetSuppliesCount < 2) {
        suppliesToAdd.push({
          name: internetSuppliesCount === 0 ? "Wifi" : "Wifi 2Q",
          type: "INTERNET",
          amount: internetSuppliesAmount,
          date: new Date(),
          expirationDate: new Date(),
          status: "PENDING",
          leaseOrderId: leaseOrder.id,
          leaseOrderType: "ROOM",
          propertyId: leaseOrder.propertyId,
          clientId: leaseOrder.clientId,
        });
      }

      updatedCount++;
      console.log(
        `${updatedCount}. Serial: ${leaseOrder.room.serial} - End Date: ${
          endDate.toISOString().split("T")[0]
        }`
      );
    }

    console.log(`Total lease orders updated: ${updatedCount}`);

    if (suppliesToAdd.length > 0) {
      await Supply.bulkCreate(suppliesToAdd);
    }

    return NextResponse.json(
      {
        message:
          suppliesToAdd.length > 0
            ? "Supplies added for eligible lease orders"
            : "No new supplies needed",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
