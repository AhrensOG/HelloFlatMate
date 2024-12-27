import {
  Client,
  Document,
  LeaseOrderProperty,
  LeaseOrderRoom,
  Owner,
  Property,
  RentalItem,
  RentalPeriod,
  Room,
} from "@/db/init";
import leaseOrderProperty from "@/db/models/leaseOrderProperty";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function getAllProperties() {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: Room,
          as: "rooms",
          include: [
            {
              model: RentalItem,
              as: "rentalItems",
              include: {
                model: RentalPeriod,
                as: "rentalPeriod",
              },
            },
            {
              model: LeaseOrderRoom,
              as: "leaseOrdersRoom",
            },
          ],
        },
        {
          model: RentalItem,
          as: "rentalItems",
          include: {
            model: RentalPeriod,
            as: "rentalPeriod",
          },
        },
        {
          model: LeaseOrderProperty,
          as: "leaseOrdersProperty",
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

export async function getPropertyById(id) {
  try {
    const property = await Property.findByPk(id, {
      include: [
        {
          model: Room,
          as: "rooms",
          include: [
            {
              model: LeaseOrderRoom,
              as: "leaseOrdersRoom",
              include: {
                model: Client,
                as: "client",
                include: {
                  model: Document,
                  as: "documents",
                },
              },
            },
            {
              model: RentalItem,
              as: "rentalItems",
              include: {
                model: RentalPeriod,
                as: "rentalPeriod",
              },
            },
          ],
        },
        {
          model: LeaseOrderProperty,
          as: "leaseOrdersProperty",
          include: {
            model: Client,
            as: "client",
            include: {
              model: Document,
              as: "documents",
            },
          },
        },
        {
          model: RentalItem,
          as: "rentalItems",
          include: {
            model: RentalPeriod,
            as: "rentalPeriod",
          },
        },
      ],
    });
    if (!property)
      return NextResponse.json(
        { error: "Propiedad no encontrada" },
        { status: 404 }
      );

    return NextResponse.json({ property }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error al obtener la propiedad" },
      { status: 500 }
    );
  }
}

export async function getPropertiesByOwnerId(id) {
  try {
    const properties = await Property.findAll({
      attributes: [
        "name",
        "serial",
        "id",
        "category",
        "status",
        "street",
        "streetNumber",
        "city",
        "postalCode",
        "zone",
        "typology",
        "size",
        "roomsCount",
        "bathrooms",
        "isActive",
        "price",
        "ownerId",
      ],
      where: { status: { [Op.ne]: "DELETED" }, ownerId: id },
      include: [
        {
          model: Room,
          as: "rooms",
          attributes: ["id", "serial", "name"],
          include: [
            {
              model: LeaseOrderRoom,
              as: "leaseOrdersRoom",
              attributes: ["startDate", "endDate", "date", "price", "status"],
              include: {
                model: Client,
                as: "client",
                attributes: [
                  "id",
                  "name",
                  "lastName",
                  "email",
                  "phone",
                  "profilePicture",
                  "emergencyName",
                  "emergencyPhone",
                  "emergencyEmail",
                ],
                include: {
                  model: Document,
                  as: "documents",
                },
              },
            },
          ],
        },
        {
          model: LeaseOrderProperty,
          as: "leaseOrdersProperty",
          include: {
            model: Client,
            as: "client",
            attributes: [
              "id",
              "name",
              "lastName",
              "email",
              "profilePicture",
              "emergencyName",
              "emergencyPhone",
              "emergencyEmail",
            ],
            include: {
              model: Document,
              as: "documents",
            },
          },
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
