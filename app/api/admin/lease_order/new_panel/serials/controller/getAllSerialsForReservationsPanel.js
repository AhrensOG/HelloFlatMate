import { NextResponse } from "next/server";
import { Property, Room } from "@/db/init";

export async function getAllSerialsForReservationsPanel() {
  try {
    const properties = await Property.findAll({
      attributes: ["serial"],
      raw: true,
    });

    const rooms = await Room.findAll({
      attributes: ["serial"],
      raw: true,
    });

    const propertySerials = Array.from(
      new Set(properties.map((p) => p.serial)),
    ).sort();

    const roomSerials = Array.from(new Set(rooms.map((r) => r.serial))).sort();

    return NextResponse.json({
      properties: propertySerials,
      rooms: roomSerials,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error obteniendo serials" },
      { status: 500 },
    );
  }
}
