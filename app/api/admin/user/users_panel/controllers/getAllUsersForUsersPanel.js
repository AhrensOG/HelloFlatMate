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

// Reutilizables
const clientAttributes = [
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
];

const clientIncludes = [
  { model: Contract, as: "contracts", attributes: ["id", "url", "name"] },
  {
    model: Document,
    as: "documents",
    attributes: ["id", "urls", "name", "createdAt"],
  },
  {
    model: Supply,
    as: "supplies",
    attributes: ["date", "status", "type", "name", "amount", "leaseOrderId"],
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
];

const ownerAttributes = [
  "id",
  "name",
  "lastName",
  "email",
  "idNum",
  "IBAN",
  "role",
];
const ownerIncludes = [
  { model: Contract, as: "contracts", attributes: ["id", "url", "name"] },
  {
    model: Document,
    as: "documents",
    attributes: ["id", "urls", "name", "createdAt"],
  },
];

// Buscar un usuario por role
async function getUserByRole(userId, role) {
  switch (role) {
    case "CLIENT":
      return await Client.findOne({
        where: { id: userId },
        attributes: clientAttributes,
        include: clientIncludes,
      });

    case "OWNER":
      return await Owner.findOne({
        where: { id: userId },
        attributes: ownerAttributes,
        include: ownerIncludes,
      });

    case "ADMIN":
      return await Admin.findOne({
        where: { id: userId },
        attributes: ["id", "name", "lastName", "email", "role"],
        raw: true,
      });

    case "WORKER":
      return await Worker.findOne({
        where: { id: userId },
        attributes: ["id", "name", "lastName", "email", "role"],
        raw: true,
      });

    default:
      return null;
  }
}

export async function getAllUsersForUsersPanel({
  page = 1,
  limit = 100,
  userId = null,
  role = null,
}) {
  try {
    const offset = (page - 1) * limit;
    // 🔍 Si hay userId y role, buscar individualmente
    if (userId && role) {
      const user = await getUserByRole(userId, role);

  console.log("=== RENT PAYMENTS DIRECTO ===");
  const payments = await RentPayment.findAll({ where: { leaseOrderId: 395 } });
  console.log(payments); // ⛔ ¿sigue apareciendo?

  console.log("=== RENT PAYMENTS EN USER ===");
  console.log(user.rentPayments); // ¿se ve el eliminado?

      return NextResponse.json(
        {
          total: user ? 1 : 0,
          users: user ? [user] : [],
        },
        { status: 200 }
      );
    }

    // 🔁 Si no hay userId, traer todos
    const { count, rows: clients } = await Client.findAndCountAll({
      offset,
      limit,
      distinct: true,
      attributes: clientAttributes,
      include: clientIncludes,
    });

    const admins = await Admin.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });

    const workers = await Worker.findAll({
      attributes: ["id", "name", "lastName", "email", "role"],
      raw: true,
    });

    const owners = await Owner.findAll({
      attributes: ownerAttributes,
      include: ownerIncludes,
    });

    return NextResponse.json(
      {
        total: count + admins.length + workers.length + owners.length,
        users: [...clients, ...owners, ...admins, ...workers],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
