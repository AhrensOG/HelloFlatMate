import { RentPayment } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateRentPayment(req) {
  try {
    const body = await req.json();
    const {
      id,
      type,
      status,
      date,
      amount,
      quotaNumber,
      description,
      paymentId,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "El ID es obligatorio." },
        { status: 400 }
      );
    }

    const existingPayment = await RentPayment.findByPk(id);

    if (!existingPayment) {
      return NextResponse.json(
        { error: "El pago no existe." },
        { status: 404 }
      );
    }

    const updateData = {};
    if (type != null) updateData.type = type;
    if (status != null) updateData.status = status;
    if (date != null) updateData.date = new Date(date);
    if (amount != null) updateData.amount = amount;
    if (quotaNumber != null) updateData.quotaNumber = quotaNumber;
    if (description != null) updateData.description = description;
    if (paymentId != null) updateData.paymentId = paymentId;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No se enviaron datos válidos para actualizar." },
        { status: 400 }
      );
    }

    await existingPayment.update(updateData);

    return NextResponse.json(existingPayment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al actualizar: ${error.message}` },
      { status: 500 }
    );
  }
}
