import { Client, LeaseOrderRoom, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getClientsForDocumentsPanel() {
  try {
    const clients = await Client.findAll({
      attributes: ["id", "name", "lastName", "email"],
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
