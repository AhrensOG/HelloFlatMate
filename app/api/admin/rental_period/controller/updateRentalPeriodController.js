import { RentalPeriod } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateRentalPeriod(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }

    if (!data.id || data.id <= 0) {
        return NextResponse.json({ message: "No id provided" }, { status: 400 });
    }

    try {
        const transaction = await RentalPeriod.sequelize.transaction();
        try {
            const rentalPeriod = await RentalPeriod.findByPk(data.id);
            if (!rentalPeriod) {
                return NextResponse.json({ message: "Rental period not found" }, { status: 404 });
            }

            rentalPeriod.startDate = data?.startDate || rentalPeriod.startDate;
            rentalPeriod.endDate = data?.endDate || rentalPeriod.endDate;
            await rentalPeriod.save({ transaction });
            await transaction.commit();
            return NextResponse.json({ rentalPeriod }, { status: 200 });
        } catch (error) {
            transaction.rollback();
            return NextResponse.json({ message: "Error updating rental period" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error updating rental period" }, { status: 500 });
    }
}

export async function updateRentalPeriodStatus(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }

    if (!data.id || data.id <= 0) {
        return NextResponse.json({ message: "No id provided" }, { status: 400 });
    }
    if (!data.status || !["RESERVED", "OCCUPIED"].includes(data.status)) {
        return NextResponse.json({ message: "No status provided" }, { status: 400 });
    }

    try {
        const transaction = await RentalPeriod.sequelize.transaction();
        try {
            const rentalPeriod = await RentalPeriod.findByPk(data.id);
            if (!rentalPeriod) {
                return NextResponse.json({ message: "Rental period not found" }, { status: 404 });
            }

            rentalPeriod.status = data.status;
            await rentalPeriod.save({ transaction });
            await transaction.commit();
            return NextResponse.json({ rentalPeriod }, { status: 200 });
        } catch (error) {
            transaction.rollback();
            return NextResponse.json({ message: "Error updating rental period" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error updating rental period" }, { status: 500 });
    }
}
