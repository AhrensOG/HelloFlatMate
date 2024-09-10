import { Client, Owner, Property, ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function createToDo(data) {
    console.log(data);

    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.title || data.title.trim() === "") return NextResponse.json({ error: "No title provided" }, { status: 400 })
    if (!data.body || data.body.trim() === "") return NextResponse.json({ error: "No body provided" }, { status: 400 })
    if (!data.type || (data.type !== "CLEAN" && data.type !== "REPAIR")) return NextResponse.json({ error: "No type provided" }, { status: 400 })
    if (!data.userId || data.userId.trim() === "") return NextResponse.json({ error: "No user id provided" }, { status: 400 })
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ error: "No property id provided" }, { status: 400 })
    if (!data.startDate || data.startDate.trim() === "") return NextResponse.json({ error: "No start date provided" }, { status: 400 })
    try {
        const property = await Property.findByPk(data.propertyId)
        if (!property) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }
        const client = await Client.findByPk(data.userId)
        const owner = await Owner.findByPk(property.ownerId)
        if (!client && !owner) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 })
        }
        const toDo = await ToDo.create({
            title: data.title,
            body: data.body,
            type: data.type,
            userId: client ? client.id : owner.id,
            propertyId: property.id,
            status: "PENDING",
            creationDate: new Date(),
            typeUser: client ? "CLIENT" : "OWNER",
            startDate: new Date(data.startDate),
            clientMessage: data.clientMessage,
            isPresent: data.isPresent
        })

        return NextResponse.json(toDo, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}