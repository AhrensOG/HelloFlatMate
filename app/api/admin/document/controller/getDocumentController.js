import { Document } from "@/db/init"
import { NextResponse } from "next/server"


export async function getDocumentById(id) {
    if (!id || id.trim() === "") {
        return NextResponse.json({ message: "No document id provided" }, { status: 400 })
    }
    const document = await Document.findByPk(id)
    return NextResponse.json(document, { status: 200 })
}

export async function getDocumentsByType(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }
    if (!data.type || data.type.trim() === "" || (data.type !== "CONTRACT" && data.type !== "SIGNATURE" && data.type !== "DNI" && data.type !== "ROSTER" && data.type !== "PASSPORT")) {
        return NextResponse.json({ message: "No document type provided or invalid" }, { status: 400 })
    }
    if (!data.typeUser || data.typeUser.trim() === "" || (data.typeUser !== "CLIENT" && data.typeUser !== "ADMIN")) {
        return NextResponse.json({ message: "No user type provided or invalid" }, { status: 400 })
    }
    if (!data.userId || data.userId.trim() === "") {
        return NextResponse.json({ message: "No user id provided" }, { status: 400 })
    }
    try {
        const documents = await Document.findAll({
            where: {
                type: data.type,
                documentableId: data.userId,
                documentableType: data.typeUser
            }
        })
        if (!documents) {
            return NextResponse.json({ message: "Documents not found" }, { status: 404 })
        }
        return NextResponse.json(documents, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Documents not found", error: error }, { status: 400 })
    }
}

export async function getDocumentsByUser(data) {

    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }
    if (!data.typeUser || data.typeUser.trim() === "" || (data.typeUser !== "CLIENT" && data.typeUser !== "ADMIN")) {
        return NextResponse.json({ message: "No user type provided or invalid" }, { status: 400 })
    }
    if (!data.userId || data.userId.trim() === "") {
        return NextResponse.json({ message: "No user id provided" }, { status: 400 })
    }

    try {
        const documents = await Document.findAll({
            where: {
                documentableId: data.userId,
                documentableType: data.typeUser
            }
        })
        if (!documents) {
            return NextResponse.json({ message: "Documents not found" }, { status: 404 })
        }
        return NextResponse.json(documents, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Documents not found", error: error }, { status: 400 })
    }
}