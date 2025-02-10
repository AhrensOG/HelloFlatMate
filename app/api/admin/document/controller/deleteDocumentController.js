import { Document } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteDocument(id) {
    try {
        const transaction = await Document.sequelize.transaction();
        if (!id) {
            return NextResponse.json({ message: "No document id provided" }, { status: 400 });
        }

        const document = await Document.findByPk(id);
        if (!document) {
            transaction.rollback();
            return NextResponse.json({ message: "Document not found" }, { status: 404 });
        }
        await document.destroy();
        await transaction.commit();
        return NextResponse.json({ message: "Document deleted successfully" }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ message: "Document not deleted", error: error }, { status: 400 });
    }
}
