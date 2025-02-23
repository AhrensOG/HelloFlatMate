import { RentPayment } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteRentPayment(id) {
  try {
    if (!id) {
      return NextResponse.json(
        { error: "El ID es obligatorio." },
        { status: 400 }
      );
    }

    const existingPayment = await RentPayment.findByPk(id);

    if (!existingPayment) {
      return NextResponse.json(
        { error: "El cobro no existe." },
        { status: 404 }
      );
    }

    await existingPayment.destroy();

    return NextResponse.json("Success delete", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al actualizar: ${error.message}` },
      { status: 500 }
    );
  }
}
