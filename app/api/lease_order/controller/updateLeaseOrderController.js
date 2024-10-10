import { LeaseOrderProperty, LeaseOrderRoom } from "@/db/init";
import { sequelize } from "@/db/models/comment";
import message from "@/db/models/message";
import { NextResponse } from "next/server";
import { error } from "pdf-lib";

export async function updateIsSignedStatus(data) {
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.id || data.id <= 0) return NextResponse.json({ error: "No order id provided" }, { status: 400 });
    if (!data.isSigned) return NextResponse.json({ error: "No isSigned provided" }, { status: 400 });
    if (!data.type || data.type !== "room" && data.type !== "property") return NextResponse.json({ error: "No type provided" }, { status: 400 });
    try {
        const transaction = sequelize.transaction();
        try {
            if (data.type === "room") {
                const leasoOrderRoom = LeaseOrderRoom.findByPk(data.id)
                if (!leasoOrderRoom) {
                    return NextResponse.json({ error, message: "Lease order room not found" }, { status: 404 })
                }
                leasoOrderRoom.isSigned = data.isSigned
                await leasoOrderRoom.save({ transaction })
                await transaction.commit();
                return NextResponse.json({ message: "Lease order room updated successfully" }, { status: 200 })
            }
            if (data.type === "property") {
                const leasoOrderProperty = await LeaseOrderProperty.findByPk(data.id)
                if (!leasoOrderProperty) {
                    return NextResponse.json({ error, message: "Lease order property not found" }, { status: 404 })
                }
                leasoOrderProperty.isSigned = data.isSigned
                await leasoOrderProperty.save({ transaction })
                await transaction.commit();
                return NextResponse.json({ message: "Lease order property updated successfully" }, { status: 200 })
            }
        } catch (error) {
            await transaction.rollback();
            return NextResponse.json({ error, message: "Error updating order" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Error updating order" }, { status: 500 });
    }
}