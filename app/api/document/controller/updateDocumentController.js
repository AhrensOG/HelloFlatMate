import { Document } from "@/db/init"
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