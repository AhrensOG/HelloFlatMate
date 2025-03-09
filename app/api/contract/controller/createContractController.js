import { Contract, LeaseOrderRoom, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function createContract(data) {
    if (!data)
        return NextResponse.json(
            { message: "No data provided" },
            { status: 400 }
        );
    if (!data.ownerId || data.ownerId.trim() === "")
        return NextResponse.json(
            { message: "No owner id provided" },
            { status: 400 }
        );
    if (!data.clientId || data.clientId.trim() === "")
        return NextResponse.json(
            { message: "No client id provided" },
            { status: 400 }
        );
    if (!(data.roomId > 0))
        return NextResponse.json(
            { message: "No property id provided" },
            { status: 400 }
        );
    if (!data.name || data.name.trim() === "")
        return NextResponse.json(
            { message: "No contract name provided" },
            { status: 400 }
        );
    if (!data.url || data.url.trim() === "")
        return NextResponse.json(
            { message: "No contract url provided" },
            { status: 400 }
        );
    if (!data.leaseOrderId)
        return NextResponse.json(
            { message: "No Order id provided" },
            { status: 400 }
        );

    try {
        const transaction = await Contract.sequelize.transaction();
        try {
            const room = await Room.findByPk(data.roomId);
            const leaseOrder = await LeaseOrderRoom.findOne({
                where: { id: data.leaseOrderId },
            });
            if (!room) {
                await transaction.rollback();
                return NextResponse.json(
                    { message: "Room not found" },
                    { status: 400 }
                );
            }
            if (!leaseOrder) {
                await transaction.rollback();
                return NextResponse.json(
                    { message: "Lease Order not found" },
                    { status: 400 }
                );
            }
            const contractData = {
                name: data.name,
                url: data.url,
                ownerId: data.ownerId,
                clientId: data.clientId,
                contractableId: data.roomId,
                contractableType: "ROOM",
                status: "APPROVED",
                leaseOrderId: leaseOrder.id,
                leaseOrderType: "ROOM",
            };

            const updateLeaseOrderFlags = async () => {
                leaseOrder.isActive = true;
                leaseOrder.isSigned = true;
                leaseOrder.inReview = false;
                await leaseOrder.save({ transaction });
            };

            const existingContract = await Contract.findOne({
                where: {
                    leaseOrderId: data.leaseOrderId,
                    clientId: data.clientId,
                },
            });
            if (existingContract) {
                existingContract.url = data.url;
                await existingContract.save({ transaction });
                await updateLeaseOrderFlags();
                await transaction.commit();
                console.log(
                    `✅ Contrato actualizado para el usuario: ${data.clientId}`
                );
                return NextResponse.json(
                    { message: "Contract updated successfully" },
                    { status: 200 }
                );
            }

            await Contract.create(contractData, { transaction });
            await updateLeaseOrderFlags();
            await transaction.commit();
            console.log(
                `✅ Contrato firmado para el usuario: ${data.clientId}`
            );
            return NextResponse.json(
                { message: "Contract created successfully" },
                { status: 200 }
            );
        } catch (error) {
            await transaction.rollback();
            console.error("Transaction error:", error);
            return NextResponse.json(
                { message: "Contract not created" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error creating contract:", error);
        return NextResponse.json(
            { message: "Contract not created" },
            { status: 400 }
        );
    }
}
