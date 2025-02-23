import { Document, LeaseOrderRoom } from "@/db/init";
import { Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getDocumentsByUserId(id) {
  try {
    const documents = await Document.findAll({
      where: { documentableId: id },
    });

    if (!documents.length) {
      return NextResponse.json(
        { message: "Documents not found" },
        { status: 404 }
      );
    }

    const leaseOrderIds = documents.map((doc) => doc.leaseOrderId);
    const leaseOrders = await LeaseOrderRoom.findAll({
      where: { id: leaseOrderIds },
      include: [{ model: Room, as: "room", attributes: ["serial"] }],
      attributes: ["id"],
    });

    const enrichedDocuments = documents.map((doc) => {
      const leaseOrder = leaseOrders.find((lo) => lo.id === doc.leaseOrderId);
      doc.dataValues.room = leaseOrder.room || null;
      return doc;
    });

    return NextResponse.json(enrichedDocuments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Documents not found", error: error.message },
      { status: 400 }
    );
  }
}
