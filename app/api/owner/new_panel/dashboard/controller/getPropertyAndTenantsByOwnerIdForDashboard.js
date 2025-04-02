import {
  Client,
  Contract,
  Document,
  LeaseOrderRoom,
  Property,
  RentPayment,
  Room,
  Supply,
} from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function getPropertiesAndTenantsByOwnerIdForDashboard(id) {
  try {
    const properties = await Property.findAll({
      attributes: ["id", "serial", "category"],
      where: { status: { [Op.ne]: "DELETED" }, ownerId: id },
      include: [
        {
          model: Room,
          as: "rooms",
          attributes: ["serial", "amountOwner"],
          include: [
            {
              model: LeaseOrderRoom,
              as: "leaseOrdersRoom",
              attributes: ["id", "price", "isActive"],
              include: {
                model: Client,
                as: "client",
                attributes: [
                  "name",
                  "lastName",
                ],
                include: [
                  {
                    model: Document,
                    as: "documents",
                    attributes: ["name", "urls", "leaseOrderId"],
                  },
                  {
                    model: Contract,
                    as: "contracts",
                    attributes: ["url", "leaseOrderId"],
                  },
                  {
                    model: RentPayment,
                    as: "rentPayments",
                    attributes: [
                      "amount",
                      "date",
                      "leaseOrderId",
                      "description",
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    });

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las propiedades" },
      { status: 500 }
    );
  }
}
