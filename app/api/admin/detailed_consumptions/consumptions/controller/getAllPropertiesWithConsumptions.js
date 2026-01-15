import {
  Client,
  Consumption,
  LeaseOrderRoom,
  Property,
  Room,
  Supply,
} from "@/db/init";
import { NextResponse } from "next/server";
import { where } from "sequelize";

export async function getAllPropertiesWithConsumptions() {
  try {
    const properties = await Property.findAll({
      attributes: ["id", "serial"],
      include: {
        model: Room,
        as: "rooms",
        attributes: ["id", "serial"],
        include: {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          attributes: ["id", "status", "startDate", "endDate"],
          include: {
            model: Client,
            as: "client",
            attributes: ["id", "name", "email"],
            include: [
              {
                model: Consumption,
                as: "consumptions",
                attributes: [
                  "amount",
                  "url",
                  "type",
                  "period",
                  "leaseOrderRoomId",
                  "startDate",
                  "endDate",
                ],
              },
              {
                where: { type: "GENERAL_SUPPLIES" },
                model: Supply,
                as: "supplies",
                attributes: [
                  "id",
                  "name",
                  "type",
                  "amount",
                  "status",
                  "leaseOrderId",
                ],
              },
            ],
          },
        },
      },
    });

    return NextResponse.json(properties, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
