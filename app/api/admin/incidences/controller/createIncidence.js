import { Incidence } from "@/db/init";
import { NextResponse } from "next/server";

export async function createIncidence(data) {
  const {
    ownerId,
    propertyId,
    amount,
    date,
    url,
    type,
    title,
    description,
    status,
    paymentId,
    paymentDate,
    toDoId,
  } = data;

  if (!ownerId || !propertyId || !amount || !type) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  try {
    const incidence = await Incidence.create({
      ownerId,
      propertyId,
      amount,
      type,
      date,
      url: url || null,
      title: title || null,
      description: description || null,
      status: status || "APPROVED",
      paymentId: paymentId || null,
      paymentDate: paymentDate || null,
      toDoId: toDoId || null,
    });

    return NextResponse.json(incidence);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
