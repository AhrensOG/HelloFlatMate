import { Payment, Property, Client, Owner, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllPayments() {
    const payments = await Payment.findAll()
    return NextResponse.json({ payments }, { status: 200 })
}

export async function getPaymentById(id) {
    if (!id) {
        return NextResponse.json({ error: "No id provided" }, { status: 400 })
    }

    try {
        const payment = await Payment.findByPk(id);

        if (payment) {
            let includeOptions = [
                {
                    model: Client,
                    as: "client"
                },
                {
                    model: Owner,
                    as: "owner"
                }
            ];

            // Condicionalmente incluir el modelo relacionado basado en el tipo de pago
            if (payment.payableType === "PROPERTY") {
                includeOptions.push({
                    model: Property,
                    as: "property"
                });
            } else if (payment.payableType === "ROOM") {
                includeOptions.push({
                    model: Room,
                    as: "room"
                });
            }

            // Realiza una segunda consulta para obtener el modelo relacionado
            const paymentWithDetails = await Payment.findByPk(id, {
                include: includeOptions
            });
            return NextResponse.json({ payment }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function getPaymentByProperty(id) {
    if (!id) {
        return NextResponse.json({ error: "No id provided" }, { status: 400 })
    }
    try {
        const payments = await Payment.findAll({
            where: { propertyId: id }, include: [
                {
                    model: Client,
                    as: "client"
                },
                {
                    model: Owner,
                    as: "owner"
                },
                {
                    model: Property,
                    as: "property"
                }
            ]
        })
        return NextResponse.json({ payments }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function getPaymentByRoom(id) {
    if (!id) {
        return NextResponse.json({ error: "No id provided" }, { status: 400 })
    }
    try {
        const payments = await Payment.findAll({
            where: { roomId: id }, include: [
                {
                    model: Client,
                    as: "client"
                },
                {
                    model: Owner,
                    as: "owner"
                },
                {
                    model: Room,
                    as: "room"
                }
            ]
        })
        return NextResponse.json({ payments }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function getPaymentByClient(id) {
    if (!id) {
        return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }

    try {
        const payments = await Payment.findAll({
            where: { clientId: id },
            include: [
                {
                    model: Client,
                    as: "client"
                },
                {
                    model: Owner,
                    as: "owner"
                },
                // Incluye condicionalmente Property o Room basado en payableType
                {
                    model: Property,
                    as: "property",
                    required: false, // Incluye solo si payableType es "PROPERTY"
                    where: { payableType: "PROPERTY" }
                },
                {
                    model: Room,
                    as: "room",
                    required: false, // Incluye solo si payableType es "ROOM"
                    where: { payableType: "ROOM" }
                }
            ]
        });

        return NextResponse.json({ payments }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function getPaymentByOwner(id) {
    if (!id) {
        return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }

    try {
        const payments = await Payment.findAll({
            where: { ownerId: id },
            include: [
                {
                    model: Client,
                    as: "client"
                },
                {
                    model: Owner,
                    as: "owner"
                },
                // Incluye condicionalmente Property o Room basado en payableType
                {
                    model: Property,
                    as: "property",
                    required: false, // Incluye solo si payableType es "PROPERTY"
                    where: { payableType: "PROPERTY" }
                },
                {
                    model: Room,
                    as: "room",
                    required: false, // Incluye solo si payableType es "ROOM"
                    where: { payableType: "ROOM" }
                }
            ]
        });

        return NextResponse.json({ payments }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}