import { Client, LeaseOrderRoom, Owner, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getClientsAndOwnersForChatsPanel() {
  try {
    const clients = await Client.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });

    const owners = await Owner.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });

    return NextResponse.json({ clients, owners }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
