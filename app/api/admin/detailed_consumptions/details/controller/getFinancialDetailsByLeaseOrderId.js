// controller/getFinancialDetailsByLeaseOrderId.js
import { Client, Consumption, Supply } from "@/db/init";
import { NextResponse } from "next/server";

export async function getFinancialDetailsByLeaseOrderId(
  clientId,
  leaseOrderId
) {
  try {
    if (!clientId || !leaseOrderId) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    // Consultamos directamente al cliente
    const clientData = await Client.findByPk(clientId, {
      attributes: ["id", "name", "lastName", "email"],
      include: [
        {
          model: Consumption,
          as: "consumptions",
          where: { leaseOrderRoomId: leaseOrderId },
          attributes: [
            "amount",
            "url",
            "type",
            "period",
            "leaseOrderRoomId",
            "startDate",
            "endDate",
          ],
          required: false,
        },
        {
          model: Supply,
          as: "supplies",
          where: {
            leaseOrderId: leaseOrderId,
            type: "GENERAL_SUPPLIES",
          },
          attributes: [
            "id",
            "name",
            "type",
            "amount",
            "status",
            "leaseOrderId",
          ],
          required: false,
        },
      ],
    });

    return NextResponse.json(clientData, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
