import { NextResponse } from "next/server";
import { Op } from "sequelize";
import {
  Client,
  Contract,
  Document,
  LeaseOrderRoom,
  Property,
  Room,
} from "@/db/init";

export async function getAllLeaseOrdersForReservationsPanel(
  page = 1,
  limit = 100,
  startDate = null,
  status = null,
  clientId
) {
  try {
    const offset = (page - 1) * limit;

    const whereConditions = {};

    if (startDate) {
      whereConditions.startDate = {
        [Op.gte]: `${startDate}T00:00:00.000Z`,
        [Op.lt]: `${startDate}T23:59:59.999Z`,
      };
    }

    if (status) {
      whereConditions.status = status;
    }

    if (clientId) {
      whereConditions.clientId = clientId;
    }

    const { rows: leaseOrders, count: total } =
      await LeaseOrderRoom.findAndCountAll({
        where: whereConditions,
        include: [
          {
            model: Property,
            as: "property",
            attributes: ["id", "serial", "category", "ownerId"],
          },
          { model: Room, as: "room", attributes: ["id", "serial"] },
          {
            model: Client,
            as: "client",
            attributes: [
              "id",
              "name",
              "lastName",
              "email",
              "idNum",
              "birthDate",
              "country",
              "reasonForValencia",
              "reasonForValenciaOther",
              "personalReview",
              "phone",
              "signature",
              "city",
              "street",
              "streetNumber",
              "postalCode",
              "emergencyName",
              "emergencyEmail",
              "emergencyPhone",
              "genre",
              "howMetUs",
              "destinationUniversity",
              "homeUniversity",
              "arrivalDate",
              "arrivalTime",
            ],
            include: [
              {
                model: Document,
                as: "documents",
                attributes: ["name", "urls"],
              },
              { model: Contract, as: "contracts", attributes: ["name", "url"] },
            ],
          },
        ],
        limit,
        offset,
        order: [["date", "DESC"]],
        // raw: true,
        // nest: true,
      });

    const formattedOrders = leaseOrders.map((order) => ({
      ...order.toJSON(),
      type: "room",
    }));

    return NextResponse.json({
      leaseOrders: formattedOrders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: offset + formattedOrders.length < total,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
