import { Supply } from "@/db/init"; // Importar el modelo Supply desde tu ORM (Sequelize)
import { NextResponse } from "next/server";

export async function createSupplyWorker(data) {
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.name || data.name.trim() === "") return NextResponse.json({ error: "No title provided" }, { status: 400 });
    if (!data.amount || data.amount <= 0) return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 });
    if (
        !data.type ||
        (data.type !== "EXPENSES" &&
            data.type !== "WATER" &&
            data.type !== "GAS" &&
            data.type !== "ELECTRICITY" &&
            data.type !== "INTERNET" &&
            data.type !== "OTHERS" &&
            data.type !== "MAINTENANCE" &&
            data.type !== "CLEAN")
    )
        return NextResponse.json({ error: "Invalid type provided" }, { status: 400 });
    if (!data.propertyId) return NextResponse.json({ error: "No property ID provided" }, { status: 400 });
    if (!data.clientId) return NextResponse.json({ error: "No client ID provided" }, { status: 400 });

    try {
        // Crear el registro de Supply
        const supply = await Supply.create({
            name: data.name,
            amount: data.amount,
            status: data.status, // El estado por defecto es 'APPROVED'
            type: data.type,
            reference: data.reference || "",
            date: new Date(),
            expirationDate: new Date(data.expirationDate),
            paymentDate: !data.paymentDate || data.paymentDate === "" ? null : data.paymentDate,
            paymentId: !data.paymentId || data.paymentId === "" ? null : data.paymentId,
            clientId: data.clientId,
            propertyId: data.propertyId,
        });
        console.log(data);
        return NextResponse.json(supply.toJSON(), { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
