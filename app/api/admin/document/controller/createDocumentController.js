import { Document } from "@/db/init";
import { NextResponse } from "next/server";

export async function createDocument(data) {
    try {
        if (!data) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }
        if (!data.name || data.name.trim() === "") {
            return NextResponse.json({ error: "Missing name" }, { status: 400 });
        }
        if (!data.documentableId || data.documentableId.trim() === "") {
            return NextResponse.json({ error: "Missing documentableId" }, { status: 400 });
        }
        if (!data.type || data.type.trim() === "" || data.type !== "ROSTER") {
            return NextResponse.json({ error: "Missing type or invalid type" }, { status: 400 });
        }
        if (!data.urls || !Array.isArray(data.urls) || data.urls.length === 0) {
            return NextResponse.json({ error: "Missing urls" }, { status: 400 });
        }
        if (!data.leaseOrderId || data.leaseOrderId <= 0) {
            return NextResponse.json({ error: "Missing leaseOrderId" }, { status: 400 });
        }
        if (!data.leaseOrderType || data.leaseOrderType.trim() === "" || data.leaseOrderType !== "ROOM") {
            return NextResponse.json({ error: "Missing leaseOrderType or invalid leaseOrderType" }, { status: 400 });
        }
        const document = await Document.create(data);
        return NextResponse.json(document, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
