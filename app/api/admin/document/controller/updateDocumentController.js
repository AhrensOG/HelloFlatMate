import { Document } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateStateDocument(data) {

    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }
    if (!data.id || data.id <= 0) {
        return NextResponse.json({ message: "No document id provided" }, { status: 400 });
    }

    const transaction = await Document.sequelize.transaction();
    try {
        const document = await Document.findByPk(data.id);
        if (document) {
            await document.update(
                { status: data?.status || document.status, urls: data?.urls || document.urls, name: data?.name || document.name },
                { transaction }
            );
            await transaction.commit();
            return NextResponse.json({ message: "Document updated successfully" }, { status: 200 });
        }
        transaction.rollback();
        return NextResponse.json({ message: "Document not found" }, { status: 404 });
    } catch (error) {
        console.log(error);
        transaction.rollback();
        return NextResponse.json({ message: "Document not updated", error: error }, { status: 400 });
    }
}
