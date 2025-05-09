import { Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function getPropertiesForUsersPanel() {
  try {
    const clients = await Property.findAll({
      attributes: ["id", "serial"],
      raw: true,
    });

    return NextResponse.json(clients, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
