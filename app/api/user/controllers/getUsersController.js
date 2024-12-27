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
  Payment,
  Worker,
  RentPayment,
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
        // {
        //   model: LeaseOrderProperty,
        //   as: "leaseOrdersProperty",
        //   include: [{ model: Property, as: "property" }],
        // },
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          include: [
            {
              model: Room,
              as: "room",
              include: [{ model: Property, as: "property" }],
            },
          ],
        },
        // { model: ToDo, as: "toDos" },
        // { model: Document, as: "documents" },
        { model: Supply, as: "supplies" },
        // { model: Contract, as: "contracts" },
        // { model: ChatParticipant, as: "chats" },
        // { model: Payment, as: "payments" },
        { model: RentPayment, as: "rentPayments" },
      ],
    });

    if (!user) {
      user = await Admin.findByPk(id, {
        include: [{ model: ChatParticipant, as: "chats" }],
      });
    }

    if (!user) {
      user = await Owner.findByPk(id, {
        include: [
          {
            model: LeaseOrderProperty,
            as: "leaseOrdersProperty",
            include: [{ model: Property, as: "property" }],
          },
          { model: LeaseOrderRoom, as: "leaseOrdersRoom" },
          { model: Property, as: "properties" },
          { model: ToDo, as: "toDos" },
          { model: Document, as: "documents" },
          { model: ChatParticipant, as: "chats" },
        ],
      });
    }

    if (!user) {
      user = await Worker.findByPk(id, {
        include: [{ model: ToDo, as: "toDos" }],
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
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
