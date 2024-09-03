import { Client, Property, Supply } from "@/db/init";
import { NextResponse } from "next/server";



export async function getSupply(id) {
    const supply = await Supply.findByPk(id, {
        include: [
            {
                model: Client,
                as: "client"
            },
            {
                model: Property,
                as: "property"
            }
        ]
    })
    if (!supply) return NextResponse.json({ error: "Supply not found" }, { status: 404 })
    return NextResponse.json(supply)
}

export async function getSupplyByPropertyId(id) {
    const supply = await Supply.findAll({
        where: {
            propertyId: id
        }
    })
    if (!supply) return NextResponse.json({ error: "Supply not found" }, { status: 404 })
    return NextResponse.json(supply)
}

export async function getSupplyByClientId(id) {
    const supply = await Supply.findAll({
        where: {
            clientId: id
        }
    })
    if (!supply) return NextResponse.json({ error: "Supply not found" }, { status: 404 })
    return NextResponse.json(supply)
}