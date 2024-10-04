import { ToDo } from "@/db/init";
import { NextResponse } from "next/server";

export async function changeStatus(data) {
    console.log(data);

    if (!data) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    if (!data.id || data.id <= 0) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    if (!data.status || data.status.trim() === "" || data.status !== "COMPLETED" && data.status !== "PENDING") {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    try {
        const transaction = await ToDo.sequelize.transaction();
        try {
            const todo = await ToDo.findByPk(data.id);
            if (!todo) {
                transaction.rollback();
                return NextResponse.json({ message: "To do not found" }, { status: 404 });
            }
            todo.status = data.status;
            todo.comment = data.comment;
            if (data.status === "COMPLETED") {
                todo.endDate = new Date();
            }
            await todo.save();
            await transaction.commit();
            return NextResponse.json({ message: "To do updated successfully" }, { status: 200 });
        } catch (err) {
            transaction.rollback();
            return NextResponse.json({ message: err }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
}

export async function asignToWorker(data) {
    console.log(data);

    if (!data) {
        return NextResponse.json({ message: "Bad request need data" }, { status: 400 });
    }
    if (!data.id || data.id <= 0) {
        return NextResponse.json({ message: "Bad request need id" }, { status: 400 });
    }
    if (!data.workerId || data.workerId.trim() === "") {
        return NextResponse.json({ message: "Bad request need worker" }, { status: 400 });
    }

    try {
        const transaction = await ToDo.sequelize.transaction();
        try {
            const todo = await ToDo.findByPk(data.id);
            if (!todo) {
                transaction.rollback();
                return NextResponse.json({ message: "To do not found" }, { status: 404 });
            }
            todo.workerId = data.workerId;
            await todo.save();
            await transaction.commit();
            return NextResponse.json({ message: "To do updated successfully" }, { status: 200 });
        } catch (err) {
            transaction.rollback();
            return NextResponse.json({ message: err }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
}