import { LeaseOrderRoom } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function GET() {
    try {
        const leaseOrders = await LeaseOrderRoom.findAll({ where: { isActive: true, endDate: { [Op.lte]: new Date() } } });

        if (leaseOrders.length === 0) {
            return NextResponse.json({ message: "No lease orders to update" }, { status: 200 });
        }

        const updateLeaseOrders = await LeaseOrderRoom.update(
            { isActive: false },
            {
                where: {
                    id: leaseOrders.map((leaseOrder) => leaseOrder.id),
                },
            }
        );

        return NextResponse.json({ message: "Lease orders updated" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
