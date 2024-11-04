import { RentPayment } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllRentPayment() {
    try {
        const rentPaymens = await RentPayment.findAll();

        return NextResponse.json(rentPaymens, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function getRentPaymentById(id) {
    if (!id || id <= 0) {
        return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }
    try {
        const rentPayment = await RentPayment.findByPk(id);
        return NextResponse.json(rentPayment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function getRentPaymentByPropertyId(propertyId) {
    if (!propertyId || propertyId <= 0) {
        return NextResponse.json({ error: "No property id provided" }, { status: 400 });
    }
    try {
        const rentPayment = await RentPayment.findAll({ where: { paymentableId: propertyId } });
        return NextResponse.json(rentPayment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function getRentPaymentsByClientId(clientId) {
    if (!clientId || clientId.trim() === "") {
        return NextResponse.json({ error: "No client id provided" }, { status: 400 });
    }
    try {
        const rentPayment = await RentPayment.findAll({ where: { clientId: clientId } });
        return NextResponse.json(rentPayment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
