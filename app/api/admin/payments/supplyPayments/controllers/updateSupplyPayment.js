import { Supply } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateSupplyPayment(req) {
  try {
    const body = await req.json();
    const { id, type, status, date, amount, name, paymentId } = body;

    if (!id) {
      return NextResponse.json(
        { error: "El ID es obligatorio." },
        { status: 400 }
      );
    }

    const existingSupply = await Supply.findByPk(id);

    if (!existingSupply) {
      return NextResponse.json(
        { error: "El suministro no existe." },
        { status: 404 }
      );
    }

    const updateData = {};
    if (type != null) updateData.type = type;
    if (status != null) updateData.status = status;
    if (date != null) updateData.date = new Date(date);
    if (amount != null) updateData.amount = amount;
    if (name != null) updateData.name = name;
    if (paymentId != null) updateData.paymentId = paymentId;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No se enviaron datos válidos para actualizar." },
        { status: 400 }
      );
    }

    await existingSupply.update(updateData);

    return NextResponse.json(existingSupply, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al actualizar: ${error.message}` },
      { status: 500 }
    );
  }
}
