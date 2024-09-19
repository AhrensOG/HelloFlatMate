import { RentalPeriod } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRentalPeriod(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }

    //En caso que sea solo uno
    if (!Array.isArray(data)) {
        if (!data.startDate) {
            return NextResponse.json({ message: "No start date provided" }, { status: 400 })
        }
        if (!data.endDate) {
            return NextResponse.json({ message: "No end date provided" }, { status: 400 })
        }
        if (!data.rentalPeriodableId) {
            return NextResponse.json({ message: "No rental periodable id provided" }, { status: 400 })
        }
        if (!data.rentalPeriodableType || !["PROPERTY", "ROOM"].includes(data.rentalPeriodableType)) {
            return NextResponse.json({ message: "No rental periodable type provided" }, { status: 400 })
        }

        try {
            const transaction = await RentalPeriod.sequelize.transaction();
            try {
                const rentalPeriod = await RentalPeriod.create({
                    ...data,
                    status: "FREE"
                }, { transaction });
                await transaction.commit();
                return NextResponse.json({ rentalPeriod }, { status: 200 })
            } catch (error) {
                transaction.rollback();
                return NextResponse.json({ message: "Error creating rental period" }, { status: 500 })
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: "Error creating rental period" }, { status: 500 })
        }
    }


    //En caso que sean varios

    //Verificar que los datos sean correctos
    for (const [index, rentalPeriod] of data.entries()) {
        if (!rentalPeriod.startDate) {
            return NextResponse.json({ message: "No start date provided: " + index }, { status: 400 })
        }
        if (!rentalPeriod.endDate) {
            return NextResponse.json({ message: "No end date provided: " + index }, { status: 400 })
        }
        if (!rentalPeriod.rentalPeriodableId) {
            return NextResponse.json({ message: "No rental periodable id provided: " + index }, { status: 400 })
        }
        if (!rentalPeriod.rentalPeriodableType || !["PROPERTY", "ROOM"].includes(rentalPeriod.rentalPeriodableType)) {
            return NextResponse.json({ message: "No rental periodable type provided: " + index }, { status: 400 })
        }
    }

    //Crear los periodos
    try {
        const transaction = await RentalPeriod.sequelize.transaction();
        try {
            const rentalPeriods = await RentalPeriod.bulkCreate(data, { transaction });
            await transaction.commit();
            return NextResponse.json({ rentalPeriods }, { status: 200 })
        } catch (error) {
            transaction.rollback();
            return NextResponse.json({ message: "Error creating rental period" }, { status: 500 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error creating rental period" }, { status: 500 })
    }
}