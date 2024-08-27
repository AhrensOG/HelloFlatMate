import { ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllToDos() {
    const toDos = await ToDo.findAll();
    if (toDos) {
        return NextResponse.json(toDos, { status: 200 })
    }
    return NextResponse.json({ error: "Error obtein to dos" }, { status: 500 })
}

export async function getToDoById(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 })
    try {
        const toDo = await ToDo.findByPk(id)

        if (!toDo) return NextResponse.json({ error: "To Do not found" }, { status: 404 })
        return NextResponse.json(toDo, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function getToDosByUserId(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 })
    try {
        const toDos = await ToDo.findAll({ where: { userId: id } })
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