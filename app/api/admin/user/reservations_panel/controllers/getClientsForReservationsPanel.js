import { Client, LeaseOrderRoom, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getClientsForReservationsPanel() {
  try {
    const clients = await Client.findAll({
      attributes: ["id", "email", "name", "lastName"],
      raw: true,
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
