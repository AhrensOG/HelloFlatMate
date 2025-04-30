import { NextResponse } from "next/server";
import { LeaseOrderRoom } from "@/db/init";

export async function fullUpdateLeaseOrder(data) {
  if (!data.leaseOrderId) {
    return NextResponse.json(
      { message: "No lease order ID provided" },
      { status: 400 }
    );
  }

  if (!data.type || (data.type !== "property" && data.type !== "room")) {
    return NextResponse.json(
      { message: "Invalid or no type provided. Must be 'property' or 'room'" },
      { status: 400 }
    );
  }

  let transaction;
  try {
    transaction = await LeaseOrderRoom.sequelize.transaction();

    const leaseOrder = await LeaseOrderRoom.findByPk(data.leaseOrderId, { transaction });

    if (!leaseOrder) {
      await transaction.rollback();
      return NextResponse.json(
        { message: "Lease order not found" },
        { status: 404 }
      );
    }

    if (data.startDate) leaseOrder.startDate = new Date(data.startDate);
    if (data.endDate) leaseOrder.endDate = new Date(data.endDate);
    if (data.price !== undefined) leaseOrder.price = data.price;
    if (data.status) leaseOrder.status = data.status;
    if (data.clientId) leaseOrder.clientId = data.clientId;

    if (typeof data.isActive === "boolean") leaseOrder.isActive = data.isActive;
    if (typeof data.isSigned === "boolean") leaseOrder.isSigned = data.isSigned;
    if (typeof data.inReview === "boolean") leaseOrder.inReview = data.inReview;

    await leaseOrder.save({ transaction });
    await transaction.commit();

    return NextResponse.json(
      { message: "Lease order updated successfully", leaseOrder },
      { status: 200 }
    );
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error updating lease order:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
