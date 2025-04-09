import { RentalItem } from "@/db/init";
import { NextResponse } from "next/server";

export async function newCreateRentalItem(data) {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empy data" },
        { status: 400 }
      );
    }

    const validatedItems = [];

    for (const item of data) {
      const { relatedId, relatedType, rentalPeriodId } = item;

      if (!relatedId || !relatedType || !rentalPeriodId) {
        return NextResponse.json(
          { error: "Missing data" },
          { status: 400 }
        );
      }

      const alreadyExists = await RentalItem.findOne({
        where: {
          relatedId,
          relatedType,
          rentalPeriodId,
        },
      });

      if (!alreadyExists) {
        validatedItems.push({ relatedId, relatedType, rentalPeriodId });
      }
    }

    if (validatedItems.length === 0) {
      return NextResponse.json(
        { message: "Todos los periodos ya estaban registrados" },
        { status: 200 }
      );
    }

    const rentalItems = await RentalItem.bulkCreate(validatedItems);
    return NextResponse.json({ rentalItems }, { status: 200 });
  } catch (error) {
    console.error("Error en newCreateRentalItem:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
