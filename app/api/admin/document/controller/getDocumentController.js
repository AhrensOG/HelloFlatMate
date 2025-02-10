import { Client, Contract, Document, Owner } from "@/db/init";
import { NextResponse } from "next/server";

export async function getDocumentById(id) {
    if (!id || id.trim() === "") {
        return NextResponse.json({ message: "No document id provided" }, { status: 400 });
    }
    const document = await Document.findByPk(id);
    return NextResponse.json(document, { status: 200 });
}

export async function getDocumentsByType(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }
    if (
        !data.type ||
        data.type.trim() === "" ||
        (data.type !== "CONTRACT" && data.type !== "SIGNATURE" && data.type !== "DNI" && data.type !== "ROSTER" && data.type !== "PASSPORT")
    ) {
        return NextResponse.json({ message: "No document type provided or invalid" }, { status: 400 });
    }
    if (!data.typeUser || data.typeUser.trim() === "" || (data.typeUser !== "CLIENT" && data.typeUser !== "ADMIN")) {
        return NextResponse.json({ message: "No user type provided or invalid" }, { status: 400 });
    }
    if (!data.userId || data.userId.trim() === "") {
        return NextResponse.json({ message: "No user id provided" }, { status: 400 });
    }
    try {
        const documents = await Document.findAll({
            where: {
                type: data.type,
                documentableId: data.userId,
                documentableType: data.typeUser,
            },
        });
        if (!documents) {
            return NextResponse.json({ message: "Documents not found" }, { status: 404 });
        }
        return NextResponse.json(documents, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Documents not found", error: error }, { status: 400 });
    }
}

export async function getDocumentsByUser(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }
    if (!data.typeUser || data.typeUser.trim() === "" || (data.typeUser !== "CLIENT" && data.typeUser !== "ADMIN")) {
        return NextResponse.json({ message: "No user type provided or invalid" }, { status: 400 });
    }
    if (!data.userId || data.userId.trim() === "") {
        return NextResponse.json({ message: "No user id provided" }, { status: 400 });
    }

    try {
        const documents = await Document.findAll({
            where: {
                documentableId: data.userId,
                documentableType: data.typeUser,
            },
        });
        if (!documents) {
            return NextResponse.json({ message: "Documents not found" }, { status: 404 });
        }
        return NextResponse.json(documents, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Documents not found", error: error }, { status: 400 });
    }
}
export async function getAllDocuments() {
    try {
        const documents = await Document.findAll({
            attributes: ["id", "type", "documentableId", "leaseOrderId", "status", "name", "urls"],
        });
        const contracts = await Contract.findAll({
            attributes: ["id", "contractableId", "leaseOrderId", "status", "name", "url"],
            include: [
                {
                    model: Client,
                    as: "client",
                    attributes: ["id", "name", "lastName", "email", "birthDate", "phone", "reasonForValencia", "personalReview", "idNum", "country"],
                },
                { model: Owner, as: "owner", attributes: ["id", "name", "lastName"] },
            ],
        });

        if (!documents || documents.length === 0) {
            return NextResponse.json({ message: "No documents found" }, { status: 404 });
        }

        // Efficiently fetch all related clients at once
        const clientIds = documents.map((document) => document.documentableId);
        const clients = await Client.findAll({
            where: { id: clientIds },
            attributes: ["id", "name", "lastName", "email", "birthDate", "phone", "reasonForValencia", "personalReview", "idNum", "country"],
        });

        // Create a map for quick client lookup
        const clientMap = new Map(clients.map((client) => [client.id, client]));

        // Combine document data with client data
        const documentsWithClients = documents.map((document) => {
            const client = clientMap.get(document.documentableId) || null; // Handle cases where client might be missing
            return { ...document.dataValues, client };
        });

        const formatedContracts = contracts.map((contract) => {
            return {
                ...contract.dataValues,
                type: "CONTRACT",
            };
        });

        return NextResponse.json([...documentsWithClients, ...formatedContracts], { status: 200 });
    } catch (error) {
        console.error("Error fetching documents:", error); // Log the error for debugging
        return NextResponse.json(
            { message: "Error fetching documents", error: error.message }, // Include error message
            { status: 500 } // Use 500 for server errors
        );
    }
}
