import { LeaseOrderRoom } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function getAllLeasesByRoomId(roomId) {
  try {
    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    const leases = await LeaseOrderRoom.findAll({
      where: {
        roomId: roomId,
        status: {
          [Op.in]: ["FINISHED", "APPROVED"],
        },
      },
      attributes: ["id", "status", "startDate", "endDate", "clientId"],
      order: [["startDate", "DESC"]],
    });

    return NextResponse.json(leases, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching leases:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
