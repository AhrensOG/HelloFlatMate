import { Property, ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllToDos() {
    const toDos = await ToDo.findAll({
        include: {
            model: Property,
            as: "property"
        }
    });
    if (toDos) {
        return NextResponse.json(toDos, { status: 200 })
    }
    return NextResponse.json({ error: "Error obtein to dos" }, { status: 500 })
}

export async function getToDoById(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 })
    try {
        const toDo = await ToDo.findByPk(id, {
            include: {
                model: Property,
                as: "property"
            }
        })

        if (!toDo) return NextResponse.json({ error: "To Do not found" }, { status: 404 })
        return NextResponse.json(toDo, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function getToDosByUserId(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 })
    try {
        const toDos = await ToDo.findAll({ where: { workerId: id } })
        if (!toDos) return NextResponse.json({ error: "To Dos not found" }, { status: 404 })
        return NextResponse.json(toDos, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function getToDosByPropertyId(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 })
    try {
        const toDos = await ToDo.findAll({ where: { propertyId: id } })
        if (!toDos) return NextResponse.json({ error: "To Dos not found" }, { status: 404 })
        return NextResponse.json(toDos, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function getAllAvailableToDos() {
    const toDos = await ToDo.findAll({
        where: { status: "PENDING", workerId: null },
        include: {
            model: Property,
            as: "property"
        }
    });
    if (toDos) {
        return NextResponse.json(toDos, { status: 200 })
    }
    return NextResponse.json({ error: "Error obtein to dos" }, { status: 500 })
}