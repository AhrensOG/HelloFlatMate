import { Client, Property, Supply } from "@/db/init";
import { NextResponse } from "next/server";

export async function createSupplyController(data) {
  console.log(data);
  if (!data)
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  if (!data.title || data.title.trim() === "")
    return NextResponse.json({ error: "No title provided" }, { status: 400 });
  if (!data.clientId || data.clientId.trim() === "")
    return NextResponse.json({ error: "No user ID provided" }, { status: 400 });
  if (!data.amount || data.amount <= 0)
    return NextResponse.json(
      { error: "Invalid amount provided" },
      { status: 400 }
    );
  if (!data.propertyId || data.propertyId <= 0)
    return NextResponse.json(
      { error: "No property id provided" },
      { status: 400 }
    );
  if (
    !data.typeSupply ||
    (data.typeSupply !== "EXPENSES" &&
      data.typeSupply !== "WATER" &&
      data.typeSupply !== "GAS" &&
      data.typeSupply !== "ELECTRICITY" &&
      data.typeSupply !== "INTERNET" &&
      data.typeSupply !== "OTHERS")
  )
    return NextResponse.json(
      { error: "Invalid type provided" },
      { status: 400 }
    );
  if (!data.expirationDate)
    return NextResponse.json(
      { error: "No expiration date provided" },
      { status: 400 }
    );

  try {
    const property = await Property.findByPk(data.propertyId);
    const user = await Client.findByPk(data.clientId);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const supply = await Supply.create({
      name: data.title,
      amount: data.amount,
      date: new Date(),
      status: "PENDING",
      propertyId: data.propertyId,
      clientId: data.clientId,
      reference: data.reference || "",
      type: data.typeSupply,
      expirationDate: new Date(data.expirationDate),
    });

    return NextResponse.json(supply, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
