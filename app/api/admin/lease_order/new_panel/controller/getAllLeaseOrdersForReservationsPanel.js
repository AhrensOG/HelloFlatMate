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
  clientId,
  isActive,
  isSigned,
  serial,
  serialType,
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

    if (isActive !== undefined && isActive !== null) {
      whereConditions.isActive = isActive === "true";
    }

    if (isSigned !== undefined && isSigned !== null) {
      whereConditions.isSigned = isSigned === "true";
    }

    // ====== INCLUDES DINÁMICOS (CAMBIO REAL) ======

    const propertyInclude = {
      model: Property,
      as: "property",
      attributes: ["id", "serial", "category", "ownerId"],
    };

    const roomInclude = {
      model: Room,
      as: "room",
      attributes: ["id", "serial"],
    };

    if (serial && serialType === "ROOM") {
      roomInclude.where = { serial };
    }

    if (serial && serialType === "PROPERTY") {
      propertyInclude.where = { serial };
    }

    // =============================================

    const { rows: leaseOrders, count: total } =
      await LeaseOrderRoom.findAndCountAll({
        where: whereConditions,
        include: [
          propertyInclude,
          roomInclude,
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
              {
                model: Contract,
                as: "contracts",
                attributes: ["name", "url"],
              },
            ],
          },
        ],
        limit,
        offset,
        order: [["date", "DESC"]],
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
