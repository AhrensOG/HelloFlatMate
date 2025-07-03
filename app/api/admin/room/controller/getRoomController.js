import {
  Client,
  LeaseOrderRoom,
  Property,
  RentalDayPrice,
  RentalItem,
  RentalPeriod,
  Room,
} from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function getAllRooms() {
  try {
    const rooms = await Room.findAll({
      attributes: [
        "id",
        "serial",
        "price",
        "name",
        "status",
        "isActive",
        "calendar",
      ],
      include: [
        {
          model: Property,
          as: "property",
          attributes: [
            "id",
            "city",
            "street",
            "streetNumber",
            "zone",
            "ownerId",
            "typology",
            "category",
          ],
        },
        {
          model: RentalItem,
          as: "rentalItems",
          attributes: ["id"],
          include: [
            {
              model: RentalPeriod,
              as: "rentalPeriod",
              attributes: ["startDate", "endDate"],
            },
            {
              model: RentalDayPrice,
              as: "rentalDayPrices",
            },
          ],
        },
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          attributes: ["status", "isActive"],
          include: [
            {
              model: Client,
              as: "client",
              attributes: ["name", "lastName", "email"],
            },
          ],
        },
      ],
      where: { status: { [Op.ne]: "DELETED" } },
    });
    if (!rooms) {
      return NextResponse.json(
        { error: "Habitaciones no encontradas" },
        { status: 404 }
      );
    }

    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las habitaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener las habitaciones" },
      { status: 500 }
    );
  }
}

export async function getRoomById(id) {
  try {
    const room = await Room.findByPk(id);
    if (!room)
      return NextResponse.json(
        { error: "Habitacion no encontrada" },
        { status: 404 }
      );

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener la habitacion" },
      { status: 500 }
    );
  }
}
