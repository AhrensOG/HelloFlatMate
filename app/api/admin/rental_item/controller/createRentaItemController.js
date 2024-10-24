import { RentalItem, Room } from "@/db/init";
import { sequelize } from "@/db/models/comment"
import { NextResponse } from "next/server";

export async function createRentalItem(data) {
    if(!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }
    if(!data.relatedId || data.relatedId <= 0) {
        return NextResponse.json({ message: "No related id provided" }, { status: 400 })
    }
    if(!data.relatedType || data.relatedType != "ROOM" && data.relatedType != "PROPERTY") {
        return NextResponse.json({ message: "No related type provided" }, { status: 400 })
    }
    if(!data.rentalPeriodIds || Array.isArray(data.rentalPeriodIds) && data.rentalPeriodIds.length <= 0) {
        return NextResponse.json({ message: "No rental periods ids provided" }, { status: 400 })
    }

    const rentalItemsData = data.rentalPeriodIds.map((item)=>{
        return{
            relatedId: data.relatedId,
            relatedType: data.relatedType,
            rentalPeriodId: item
        }
    })

    try {
        const transaction = await sequelize.transaction();
        try {
            if(data.relatedType === "ROOM" && Room.count({where: {id: data.relatedId}}) <= 0) {
                const rentalItems = await RentalItem.bulkCreate(rentalItemsData, { transaction })
                await transaction.commit();
                return NextResponse.json({ rentalItems }, { status: 200 })
            }
            if(data.relatedType === "PROPERTY" && Property.count({where: {id: data.relatedId}}) <= 0) {
                const rentalItems = await RentalItem.bulkCreate(rentalItemsData, { transaction })
                await transaction.commit();
                return NextResponse.json({ rentalItems }, { status: 200 })
            }
        }catch(error) {
            await transaction.rollback();
            return NextResponse.json({ error }, { status: 500 })
        }
    }catch(error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}