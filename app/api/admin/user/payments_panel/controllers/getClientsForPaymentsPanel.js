import { Client, LeaseOrderRoom, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getClientsForPaymentsPanel() {
  try {
    const clients = await Client.findAll({
      attributes: ["id", "name", "lastName", "email"],
      include: [
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          attributes: ["id", "startDate", "endDate"],
          include: [{ model: Room, as: "room", attributes: ["serial"] }],
        },
      ],
    });

    return NextResponse.json(clients, {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
