import { Owner, Payment, Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function createPayment(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }
    if (!data.amount || data.amount <= 0) {
        return NextResponse.json({ message: "No amount provided" }, { status: 400 })
    }
    if (!data.clientId || data.clientId.trim() === "") {
        return NextResponse.json({ message: "No client id provided" }, { status: 400 })
    }
    if (!data.ownerId || data.ownerId.trim() === "") {
        return NextResponse.json({ message: "No owner id provided" }, { status: 400 })
    }
    if (!data.propertyId || data.propertyId <= 0 && !data.roomId || data.roomId <= 0) {
        return NextResponse.json({ message: "No property or room id provided" }, { status: 400 })
    }
    if (!data.type || data.type !== "RESERVATION" && data.type !== "MONTHLY") {
        return NextResponse.json({ message: "No type provided" }, { status: 400 })
    }

    try {
        const transaction = await Payment.sequelize.transaction();
        try {
            const owner = await Owner.findByPk(data.ownerId, {
                include: [{
                    model: Property,
                    where: { id: data.propertyId }
                }]
            }, { transaction });
            if (!owner) {
                await transaction.rollback();
                return NextResponse.json({ message: "Owner not found" }, { status: 404 })
            }
            if (owner.properties.length === 0) {
                await transaction.rollback();
                return NextResponse.json({ message: "Property not found" }, { status: 404 })
            }

            let dataPayment;
            if (data.roomId) {
                dataPayment = {
                    amount: data.amount,
                    clientId: data.clientId,
                    ownerId: data.ownerId,
                    paymentableId: data.roomId,
                    paymentableType: "ROOM",
                    type: data.type,
                    date: new Date()
                }
            } else {
                dataPayment = {
                    amount: data.amount,
                    clientId: data.clientId,
                    ownerId: data.ownerId,
                    paymentableId: data.propertyId,
                    paymentableType: "PROPERTY",
                    type: data.type,
                    date: new Date()
                }
            }

            const payment = await Payment.create(dataPayment, { transaction });
            await transaction.commit();
            return NextResponse.json({ message: "Payment created", data: payment }, { status: 200 })
        } catch (error) {
            await transaction.rollback();
            return NextResponse.json({ message: "Payment not created", error: error }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ message: "Payment not created", error: error }, { status: 400 })
    }
}