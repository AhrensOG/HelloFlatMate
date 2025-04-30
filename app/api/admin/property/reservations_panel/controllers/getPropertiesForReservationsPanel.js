import { Client, LeaseOrderRoom, Property, RentalItem, RentalPeriod, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getPropertiesForReservationsPanel() {
  try {
    const clients = await Property.findAll({
      attributes: ["id", "serial", "ownerId"],
      include: [
        {
          model: Room,
          as: "rooms",
          attributes: ["id", "serial"],
          include: [
            {
              model: RentalItem,
              as: "rentalItems",
              attributes: ["id"],
              include: [
                {
                  model: RentalPeriod,
                  as: "rentalPeriod",
                  attributes: ["startDate", "endDate"],
                }
              ]
            }
          ]
        }
      ],
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
