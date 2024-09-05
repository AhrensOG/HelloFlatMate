import { Admin, Client, Document } from "@/db/init"
import { NextResponse } from "next/server"

export async function updateStateDocument(data) {

    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }
    if (!data.id || data.id <= 0) {
        return NextResponse.json({ message: "No document id provided" }, { status: 400 })
    }
    if (!data.state || data.state.trim() === "" || (data.state !== "APPROVED" && data.state !== "REJECTED")) {
        return NextResponse.json({ message: "No document state provided or invalid" }, { status: 400 })
    }
    if (!data.adminId || data.adminId.trim() === "") {
        return NextResponse.json({ message: "No admin id provided" }, { status: 400 })
    }

    const transaction = await Document.sequelize.transaction()
    try {
        const admin = await Admin.findByPk(data.adminId) || await Client.findByPk(data.adminId)
        if (!admin) {
            transaction.rollback();
            return NextResponse.json({ message: "Admin not found" }, { status: 404 })
        }
        const document = await Document.findByPk(data.id)
        if (document) {
            document.status = data.state
            await document.save()
            await transaction.commit();
            return NextResponse.json({ message: "Document updated successfully" }, { status: 200 })
        }
        transaction.rollback();
        return NextResponse.json({ message: "Document not found" }, { status: 404 })
    } catch (error) {
        transaction.rollback();
        return NextResponse.json({ message: "Document not updated", error: error }, { status: 400 })
    }
}