import { NextResponse } from "next/server";
import { createMonthlyOrReservationBill } from "./controller/createMonthlyOrReservationBill";
import { createSupplyBill } from "./controller/createSupplyBill";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const data = await req.json();
  if (type === "supply") {
    return await createSupplyBill(data);
  } else if (type === "monthly_or_reservation") {
    return await createMonthlyOrReservationBill(data);
  }
  return NextResponse.json("No type provided", { status: 400 });
}
