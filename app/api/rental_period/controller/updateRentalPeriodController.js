import { RentalItem, RentalPeriod } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateRentalPeriodStatus(data) {
  if (!data) {
    return NextResponse.json({ message: "No data provided" }, { status: 400 });
  }

  if (!data.id || data.id <= 0) {
    return NextResponse.json({ message: "No id provided" }, { status: 400 });
  }
  if (!data.status || !["RESERVED", "OCCUPIED"].includes(data.status)) {
    return NextResponse.json(
      { message: "No status provided" },
      { status: 400 }
    );
  }

  try {
    const transaction = await RentalItem.sequelize.transaction();
    try {
      const rentalItem = await RentalItem.findByPk(data.id);
      if (!rentalItem) {
        return NextResponse.json(
          { message: "Rental period not found" },
          { status: 404 }
        );
      }

      rentalItem.isFree =
        data.status === "RESERVED" || data.status === "OCCUPIED" ? false : true;
      await rentalItem.save({ transaction });
      await transaction.commit();

      return NextResponse.json({ rentalItem }, { status: 200 });
    } catch (error) {
      transaction.rollback();
      return NextResponse.json(
        { message: "Error updating rental period" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating rental period" },
      { status: 500 }
    );
  }
}
