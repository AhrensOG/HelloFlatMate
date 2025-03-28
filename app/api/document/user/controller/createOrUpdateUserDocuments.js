import { Document } from "@/db/init";
import { NextResponse } from "next/server";

export async function createOrUpdateUserDocuments(data) {
    try {
        if (!data) {
            return NextResponse.json(
                { message: "No data provided" },
                { status: 400 }
            );
        }

        const { userId, type, typeUser, name, leaseOrderId, files } = data;

        if (!userId || !userId.trim()) {
            return NextResponse.json(
                { message: "No user id provided" },
                { status: 400 }
            );
        }

        const allowedTypes = ["CONTRACT", "ROSTER", "IDENTIFICATION"];
        if (!type || !type.trim() || !allowedTypes.includes(type)) {
            return NextResponse.json(
                { message: "No document type provided or invalid" },
                { status: 400 }
            );
        }

        const allowedUserTypes = ["CLIENT", "ADMIN"];
        if (
            !typeUser ||
            !typeUser.trim() ||
            !allowedUserTypes.includes(typeUser)
        ) {
            return NextResponse.json(
                { message: "No user type provided or invalid" },
                { status: 400 }
            );
        }

        if (!name || !name.trim()) {
            return NextResponse.json(
                { message: "No document name provided" },
                { status: 400 }
            );
        }

        if (!leaseOrderId) {
            return NextResponse.json(
                { message: "No order id provided" },
                { status: 400 }
            );
        }

        if (!files || !Array.isArray(files) || files.length === 0) {
            return NextResponse.json(
                { message: "No files provided or files array is empty" },
                { status: 400 }
            );
        }

        const urls = files.map((file) => {
            if (!file.url || !file.url.trim()) {
                throw new Error("Some file has no URL");
            }
            return file.url;
        });

        const existingDocument = await Document.findOne({
            where: {
                documentableId: userId,
                leaseOrderId: leaseOrderId,
            },
        });

        if (existingDocument) {
            await existingDocument.update({
                urls,
            });

            return NextResponse.json(
                {
                    message: "Document updated successfully",
                    document: existingDocument,
                },
                { status: 200 }
            );
        } else {
            const document = await Document.create({
                name,
                type,
                urls,
                documentableId: userId,
                documentableType: typeUser,
                leaseOrderId,
                leaseOrderType: "ROOM",
            });

            if (!document) {
                return NextResponse.json(
                    { message: "Document not created" },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { message: "Document created successfully", document },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error creating/updating document:", error);
        return NextResponse.json(
            { message: "Document not created/updated", error: error.message },
            { status: 400 }
        );
    }
}
