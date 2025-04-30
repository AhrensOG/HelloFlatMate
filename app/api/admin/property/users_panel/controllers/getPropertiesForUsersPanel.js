import {
  Client,
  LeaseOrderRoom,
  Property,
  RentalItem,
  RentalPeriod,
  Room,
} from "@/db/init";
import { NextResponse } from "next/server";

export async function getPropertiesForUsersPanel() {
  try {
    const clients = await Property.findAll({
      attributes: ["id", "serial"],
      raw: true,
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
