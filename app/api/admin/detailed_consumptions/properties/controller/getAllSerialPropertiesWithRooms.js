import { Property, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllSerialPropertiesWithRooms() {
  try {
    const properties = await Property.findAll({
      attributes: ["id", "serial"],
      include: {
        model: Room,
        as: "rooms",
        attributes: ["id", "serial"],
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
