import { NextResponse } from "next/server";
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
  status = null
) {
  try {
    const offset = (page - 1) * limit;

    // Construimos el objeto where dinámicamente
    const whereConditions = {};
    console.log(startDate);
    console.log(status);
    if (startDate) {
      whereConditions.startDate = startDate;
    }

    if (status) {
      whereConditions.status = status;
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
        raw: true,
        nest: true,
      });

    const formattedOrders = leaseOrders.map((order) => ({
      ...order,
      type: "room",
    }));

    return NextResponse.json(
      {
        leaseOrders: formattedOrders,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + formattedOrders.length < total,
      },
      {
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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
