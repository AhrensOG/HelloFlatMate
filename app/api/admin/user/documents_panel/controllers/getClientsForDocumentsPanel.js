import { Client, LeaseOrderRoom, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getClientsForDocumentsPanel() {
  try {
    const clients = await Client.findAll({
      attributes: ["id", "name", "email"],
      include: [
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          attributes: ["id", "startDate", "endDate"],
          include: [
            {
              model: Room,
              as: "room",
              attributes: ["serial"],
            },
          ],
        },
      ],
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
