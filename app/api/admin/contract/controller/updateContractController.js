import { Contract, LeaseOrderProperty, LeaseOrderRoom } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateStatusContract(data) {
    if (!data) return NextResponse.json({ message: "No data provided" }, { status: 400 });
    if (!data.contractId || data.contractId <= 0) return NextResponse.json({ message: "No contract id provided" }, { status: 400 });
    if (!data.status || data.status.trim() === "" || (data.status !== "APPROVED" && data.status !== "REJECTED")) return NextResponse.json({ message: "No status provided" }, { status: 400 });

    const transaction = await Contract.sequelize.transaction(); // Start transaction

    try {
        const contract = await Contract.findByPk(data.contractId);

        if (!contract) {
            await transaction.rollback();
            return NextResponse.json({ message: "Contract not found" }, { status: 404 });
        }

        if (contract.contractableType === "ROOM") {
            const leaseOrderRoom = await LeaseOrderRoom.findOne({ where: { roomId: contract.contractableId } });

            if (!leaseOrderRoom) {
                await transaction.rollback();
                return NextResponse.json({ message: "Room not found" }, { status: 400 });
            }

            leaseOrderRoom.isSigned = data.status === "APPROVED";
            await leaseOrderRoom.save({ transaction });
        } else {
            const leaseOrderProperty = await LeaseOrderProperty.findOne({ where: { propertyId: contract.contractableId } });

            if (!leaseOrderProperty) {
                await transaction.rollback();
                return NextResponse.json({ message: "Property not found" }, { status: 400 });
            }

            leaseOrderProperty.isSigned = data.status === "APPROVED";
            await leaseOrderProperty.save({ transaction });
        }

        contract.status = data.status;
        await contract.save({ transaction });

        await transaction.commit(); // Commit transaction only once, if everything is successful
        return NextResponse.json({ message: "Contract updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        await transaction.rollback(); // Rollback transaction in case of an error
        return NextResponse.json({ message: "Contract not updated" }, { status: 400 });
    }
}
