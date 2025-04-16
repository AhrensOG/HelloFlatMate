import {
  Owner,
  Client,
  Admin,
  LeaseOrderProperty,
  LeaseOrderRoom,
  Property,
  ToDo,
  Document,
  Supply,
  Room,
  Contract,
  ChatParticipant,
  Worker,
  RentPayment,
  Consumption,
  Incidence,
} from "@/db/init";
import { NextResponse } from "next/server";

export async function getUserById(id) {
  if (!id) {
    console.log("getUserById: Missing ID");
    return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
  }

  try {
    let user = null;

    user = await Client.findByPk(id, {
      include: [
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          include: [
            {
              model: Room,
              as: "room",
              attributes: ["id", "serial", "images", "price"],
              include: [{ model: Property, as: "property", include:[{model: Room, as: "rooms", attributes: ["id"]}], attributes: ["id", "serial", "images", "street", "streetNumber", "postalCode", "floor", "bathrooms", "category", "ownerId"] }],
            },
          ],
        },
        { model: Document, as: "documents", attributes: ["id", "name", "type", "urls", "status", "leaseOrderId"] },
        { model: Supply, as: "supplies", attributes: ["id", "paymentId", "name","type","amount","date","status","paymentDate","leaseOrderId","propertyId","clientId"] },
        { model: Contract, as: "contracts", attributes: ["id", "leaseOrderId", "url"] },
        // { model: ChatParticipant, as: "chats" },
        { model: RentPayment, as: "rentPayments", attributes: ["id", "amount", "date","status","type","quotaNumber","paymentableId","leaseOrderId","paymentId", "description"] },
        { model: Consumption, as: "consumptions", attributes: ["amount", "url", "type", "period", "leaseOrderRoomId", "startDate", "endDate"] },
      ],
    });

    if (!user) {
      user = await Admin.findByPk(id, {
        include: [{ model: ChatParticipant, as: "chats" }],
      });
    }

    if (!user) {
      user = await Owner.findByPk(id, {
        attributes: ["id", "name", "lastName", "email", "idNum", "IBAN", "role"],
        include: [
          { model: Incidence, as: "incidences" }
        ],
      });
    }

    if (!user) {
      user = await Worker.findByPk(id, {
        include: [{ model: ToDo, as: "toDos" }],
      });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error en getUserById:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getOwnerByProperty(id) {
  if (!id) {
    return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
  }
  try {
    const owner = await Owner.findOne({
      include: {
        model: Property,
        as: "properties",
        where: {
          id,
        },
      },
    });
    return NextResponse.json(owner, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
