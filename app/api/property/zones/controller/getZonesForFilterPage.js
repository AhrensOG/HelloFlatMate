import { NextResponse } from "next/server";
import { Op } from "sequelize";
import { Room, Property } from "@/db/init";

export async function getZonesForFilterPage() {
  try {
    const rooms = await Room.findAll({
      where: {
        isActive: true,
      },
      include: [
        {
          model: Property,
          as: "property",
          attributes: ["zone"],
        },
      ],
    });

    const zones = rooms.map((room) => room.property?.zone).filter(Boolean);

    const uniqueZones = Array.from(new Set(zones));

    return NextResponse.json(uniqueZones, { status: 200 });
  } catch (error) {
    console.error("Error al obtener zonas:", error);
    return NextResponse.json(
      { error: "Error al obtener zonas" },
      { status: 500 }
    );
  }
}
