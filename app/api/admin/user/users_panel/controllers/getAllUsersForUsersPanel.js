import {
  Admin,
  Client,
  Contract,
  Document,
  LeaseOrderRoom,
  Owner,
  RentPayment,
  Room,
  Supply,
  Worker,
} from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllUsersForUsersPanel({
  page = 1,
  limit = 100,
  userId = null,
}) {
  try {
    const offset = (page - 1) * limit;

    // Admins y Workers no requieren paginación (son pocos)
    const admins = await Admin.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });
    const workers = await Worker.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });

    // Owners
    const owners = await Owner.findAll({
      attributes: ["name", "lastName", "email", "idNum", "IBAN", "role"],
      include: [
        { model: Contract, as: "contracts", attributes: ["id", "url", "name"] },
        {
          model: Document,
          as: "documents",
          attributes: ["id", "urls", "name", "createdAt"],
        },
      ],
    });

    // Filtro opcional por usuario específico
    const clientWhere = userId ? { id: userId } : {};

    const { count, rows: clients } = await Client.findAndCountAll({
      where: clientWhere,
      offset,
      limit,
      distinct: true,
      attributes: [
        "id",
        "name",
        "lastName",
        "idNum",
        "country",
        "city",
        "street",
        "streetNumber",
        "postalCode",
        "phone",
        "email",
        "emergencyName",
        "emergencyPhone",
        "emergencyEmail",
        "birthDate",
        "signature",
        "genre",
        "howMetUs",
        "destinationUniversity",
        "homeUniversity",
        "reasonForValencia",
        "reasonForValenciaOther",
        "personalReview",
        "arrivalDate",
        "arrivalTime",
        "role",
      ],
      include: [
        { model: Contract, as: "contracts", attributes: ["id", "url", "name"] },
        {
          model: Document,
          as: "documents",
          attributes: ["id", "urls", "name", "createdAt"],
        },
        {
          model: Supply,
          as: "supplies",
          attributes: [
            "date",
            "status",
            "type",
            "name",
            "amount",
            "leaseOrderId",
          ],
        },
        {
          model: RentPayment,
          as: "rentPayments",
          attributes: [
            "date",
            "status",
            "type",
            "description",
            "amount",
            "leaseOrderId",
          ],
        },
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          attributes: ["id", "startDate", "endDate"],
          include: {
            model: Room,
            as: "room",
            attributes: ["serial"],
          },
        },
      ],
    });

    return NextResponse.json(
      {
        total: count,
        users: [...clients, ...owners, ...admins, ...workers],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
