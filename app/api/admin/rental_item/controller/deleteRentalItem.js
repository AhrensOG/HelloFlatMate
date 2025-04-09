import { RentalItem } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteRentalItem(data) {
  if (!data) {
    return NextResponse.json({ message: "No data provided" }, { status: 400 });
  }

  try {
    await RentalItem.destroy({ where: { id: data } });
    return NextResponse.json("Rental item deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
