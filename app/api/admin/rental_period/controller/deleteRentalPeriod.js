import { RentalItem, RentalPeriod } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteRentalPeriodById(id) {
  if (!id) {
    return NextResponse.json({ message: "No id provided" }, { status: 400 });
  }

  try {
    const transaction = await RentalPeriod.sequelize.transaction();
    try {
      const rentalPeriod = await RentalPeriod.findByPk(id);
      if (!rentalPeriod) {
        await transaction.rollback();
        return NextResponse.json(
          { message: "Rental period not found" },
          { status: 404 }
        );
      }

      await RentalItem.destroy({
        where: { rentalPeriodId: id },
        transaction,
      });
      
      await rentalPeriod.destroy({ transaction });
      await transaction.commit();
      return NextResponse.json({ rentalPeriod }, { status: 200 });
    } catch (error) {
      await transaction.rollback();
      return NextResponse.json(
        { message: "Error deleting rental period" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting rental period" },
      { status: 500 }
    );
  }
}

export async function deleteGroupRentalPeriods(ids) {
  if (!ids) {
    return NextResponse.json({ message: "No ids provided" }, { status: 400 });
  }

  try {
    const transaction = await RentalPeriod.sequelize.transaction();
    try {
      const rentalPeriods = await RentalPeriod.findAll({
        where: {
          id: ids,
        },
      });
      if (!rentalPeriods) {
        return NextResponse.json(
          { message: "Rental periods not found" },
          { status: 404 }
        );
      }

      await RentalPeriod.destroy({
        where: {
          id: ids,
        },
        transaction,
      });
      await transaction.commit();
      return NextResponse.json({ rentalPeriods }, { status: 200 });
    } catch (error) {
      transaction.rollback();
      return NextResponse.json(
        { message: "Error deleting rental periods" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting rental periods" },
      { status: 500 }
    );
  }
}
