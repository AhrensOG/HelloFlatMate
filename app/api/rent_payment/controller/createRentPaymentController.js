import { Client, Property, RentPayment, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function createRentPayment(data) {
    if (!data) {
        return NextResponse.json({ error, message: "No data provided" }, { status: 400 });
    }
    if (!data.amount || data.amount <= 0) {
        return NextResponse.json({ error, message: "No amount provided" }, { status: 400 });
    }
    if (!data.type || (data.type !== "MONTHLY" && data.type !== "RESERVATION")) {
        return NextResponse.json({ error, message: "No type provided" }, { status: 400 });
    }
    if (!data.paymentableId || data.paymentableId <= 0) {
        return NextResponse.json({ error, message: "No paymentable id provided" }, { status: 400 });
    }
    if (!data.paymentableType || data.paymentableType.trim() === "" || (data.paymentableType !== "PROPERTY" && data.paymentableType !== "ROOM")) {
        return NextResponse.json({ error, message: "No paymentable type provided or invalid" }, { status: 400 });
    }
    if (!data.clientId || data.clientId.trim() === "") {
        return NextResponse.json({ error, message: "No client id provided" }, { status: 400 });
    }
    if (!data.leaseOrderId || data.leaseOrderId <= 0) {
        return NextResponse.json({ error, message: "No lease order id provided" }, { status: 400 });
    }
    if (!data.leaseOrderType || data.leaseOrderType.trim() === "" || (data.leaseOrderType !== "PROPERTY" && data.leaseOrderType !== "ROOM")) {
        return NextResponse.json({ error, message: "No lease order type provided or invalid" }, { status: 400 });
    }
    try {
        const property =
            data.paymentableType === "PROPERTY"
                ? await Property.findByPk(data.paymentableId)
                : await Room.findByPk(data.paymentableId, { include: { model: Property, as: "property", attributes: ["ownerId"] } });
        if (!property) {
            return NextResponse.json({ error, message: "Paymentable not found" }, { status: 404 });
        }
        console.log(property.toJSON());

        const client = await Client.findByPk(data.clientId);
        if (!client) {
            return NextResponse.json({ error, message: "Client not found" }, { status: 404 });
        }

        const paymenData = {
            amount: data.amount,
            type: data.type,
            paymentableId: data.paymentableId,
            paymentableType: data.paymentableType,
            clientId: data.clientId,
            leaseOrderId: data.leaseOrderId,
            leaseOrderType: data.leaseOrderType,
            status: "PENDING",
            quotaNumber: data.quotaNumber ? data.quotaNumber : 1,
            date: new Date(),
            ownerId: data.paymentableType === "PROPERTY" ? property.ownerId : property.property.ownerId,
        };
        console.log(paymenData);

        const rentPayment = await RentPayment.create(paymenData);
        return NextResponse.json(rentPayment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}
