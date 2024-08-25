import { ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateToDo(data) {
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.id || data.id <= 0) return NextResponse.json({ error: "No id provided" }, { status: 400 })
    if (!data.comment || data.comment.trim() === "") return NextResponse.json({ error: "No comment provided" }, { status: 400 })
    if (!data.status || (data.status !== "COMPLETED" && data.status !== "PENDING")) return NextResponse.json({ error: "No status provided" }, { status: 400 })

    try {
        const toDo = await ToDo.findByPk(data.id)
        if (!toDo) {
            return NextResponse.json({ error: "To Do not found" }, { status: 404 })
        }
        toDo.status = data.status
        toDo.comment = data.comment
        await toDo.save()
        return NextResponse.json(toDo, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}