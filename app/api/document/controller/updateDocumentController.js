import { Admin, Document } from "@/db/init"
import { NextResponse } from "next/server"

export async function updateDocument(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }
    if (!data.id || data.id <= 0) {
        return NextResponse.json({ message: "No document id provided" }, { status: 400 })
    }
    if (!data.type || data.type.trim() === "" || (data.type !== "CONTRACT" && data.type !== "SIGNATURE" && data.type !== "DNI" && data.type !== "ROSTER" && data.type !== "PASSPORT")) {
        return NextResponse.json({ message: "No document type provided or invalid" }, { status: 400 })
    }
    if (!data.url || data.url.trim() === "") {
        return NextResponse.json({ message: "No document url provided" }, { status: 400 })
    }
    if (!data.typeUser || data.typeUser.trim() === "" || (data.typeUser !== "CLIENT" && data.typeUser !== "ADMIN")) {
        return NextResponse.json({ message: "No user type provided or invalid" }, { status: 400 })
    }
    try {
        const document = await Document.findByPk(data.id)
        if (document) {
            document.type = data.type
            document.url = data.url
            document.documentableType = data.typeUser
            await document.save()
            return NextResponse.json({ message: "Document updated successfully" }, { status: 200 })
        }
        return NextResponse.json({ message: "Document not found" }, { status: 404 })
    } catch (error) {
        return NextResponse.json({ message: "Document not updated", error: error }, { status: 400 })
    }
}

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
        const admin = await Admin.findByPk(data.adminId)
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