import { Client, Consumption, LeaseOrderRoom, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllConsumption({
  page = 1,
  limit = 20,
  userId = null,
}) {
  try {
    const offset = (page - 1) * limit;
    const where = userId ? { clientId: userId } : {};

    const { count, rows } = await Consumption.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]],
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["id", "name", "lastName"],
        },
        {
          model: LeaseOrderRoom,
          as: "leaseOrderRoom",
          attributes: ["id"],
          include: [{ model: Room, as: "room", attributes: ["serial"] }],
        },
      ],
      distinct: true,
    });

    return NextResponse.json(
      {
        consumptions: rows,
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        hasMore: offset + rows.length < count,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getConsupmtionById(id) {
  if (!id)
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  try {
    const consumption = await Consumption.findByPk(id);
    return NextResponse.json(consumption);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
