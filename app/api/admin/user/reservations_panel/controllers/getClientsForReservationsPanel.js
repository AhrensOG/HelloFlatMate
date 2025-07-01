import { Client } from "@/db/init";
import { NextResponse } from "next/server";

export async function getClientsForReservationsPanel() {
  try {
    const clients = await Client.findAll({
      attributes: ["id", "email", "name", "lastName"],
      raw: true,
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
