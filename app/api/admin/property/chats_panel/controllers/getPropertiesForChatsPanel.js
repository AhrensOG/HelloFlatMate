import {
  Client,
  LeaseOrderRoom,
  Property,
  RentalItem,
  RentalPeriod,
  Room,
} from "@/db/init";
import { NextResponse } from "next/server";

export async function getPropertiesForChatsPanel() {
  try {
    const clients = await Property.findAll({
      attributes: ["id", "serial"],
      include: [
        {
          model: Room,
          as: "rooms",
          attributes: ["id", "serial"]
        },
      ],
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
