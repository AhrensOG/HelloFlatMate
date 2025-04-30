import {
  ToDo,
  ToDoMessage,
  Worker,
  Room,
  Property,
  Client,
  LeaseOrderRoom,
} from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function getToDosForUserPanel(clientId) {
  if (!clientId) {
    return NextResponse.json(
      { error: "No client ID provided" },
      { status: 400 }
    );
  }

  try {
    const user = await Client.findByPk(clientId, {
      include: [
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          attributes: ["id", "roomId"],
          include: [
            {
              model: Room,
              as: "room",
              attributes: ["id", "propertyId"],
              include: [
                {
                  model: Property,
                  as: "property",
                  attributes: ["id"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const propertyIds = user.leaseOrdersRoom
      ?.map((order) => order.room?.property?.id)
      .filter(Boolean);

    if (!propertyIds || propertyIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const toDos = await ToDo.findAll({
      where: {
        propertyId: {
          [Op.in]: propertyIds,
        },
      },
      include: [
        {
          model: Worker,
          as: "worker",
          attributes: ["name", "lastName"],
        },
        {
          model: ToDoMessage,
          as: "messages",
        },
        {
          model: Client,
          as: "client",
          attributes: ["name", "lastName"],
        },
        {
          model: Property,
          as: "property",
          attributes: [
            "city",
            "street",
            "streetNumber",
            "postalCode",
            "serial",
          ],
        },
      ],
      order: [["creationDate", "DESC"]],
    });

    return NextResponse.json(toDos, { status: 200 });
  } catch (error) {
    console.error("Error in getToDosForUserPanel:", error);
    return NextResponse.json(
      { error: "Error al obtener las incidencias" },
      { status: 500 }
    );
  }
}
