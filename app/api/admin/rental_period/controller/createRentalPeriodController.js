import { RentalPeriod } from "@/db/init"
import { NextResponse } from "next/server"

export async function createRentalPeriod(data) {
    if (!data || !Array.isArray(data)) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }

    const isCorrectData = {
        isCorrect: true,
        message: []
    }

    data.forEach((item, index) => {
        if (!item.startDate) {
            isCorrectData.isCorrect = false
            isCorrectData.message.push("No start date provided in item: " + index)
        }
        if (!item.endDate) {
            isCorrectData.isCorrect = false
            isCorrectData.message.push("No end date provided in item: " + index)
        }
    })

    if (!isCorrectData.isCorrect) {
        return NextResponse.json({ message: isCorrectData.message }, { status: 400 })
    }

    try {
        const transaction = await RentalPeriod.sequelize.transaction();
        try {
            const formatData = data.map(item => {
                return {
                    startDate: new Date(item.startDate),
                    endDate: new Date(item.endDate),
                }
            })
            const rentalPeriods = await RentalPeriod.bulkCreate(formatData, { transaction });
            await transaction.commit();
            return NextResponse.json({ rentalPeriods }, { status: 200 })
        } catch (error) {
            transaction.rollback();
            return NextResponse.json({ message: "Error creating rental period", error }, { status: 500 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error creating rental period", error }, { status: 500 })
    }
}