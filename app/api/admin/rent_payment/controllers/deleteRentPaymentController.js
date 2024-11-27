import { RentPayment } from "@/db/init"; // Importar el modelo RentPayment
import { NextResponse } from "next/server";

export async function deleteRentPayment(paymentId) {
  if (!paymentId) {
    return NextResponse.json(
      { error: "No payment ID provided" },
      { status: 400 }
    );
  }

  try {
    const rentPayment = await RentPayment.findByPk(paymentId);

    if (!rentPayment) {
      return NextResponse.json(
        { error: "RentPayment not found" },
        { status: 404 }
      );
    }

    await rentPayment.destroy();

    return NextResponse.json(
      { message: "RentPayment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
