import {
  Client,
  Contract,
  Document,
  LeaseOrderProperty,
  LeaseOrderRoom,
  Owner,
  Property,
  RentalItem,
  RentalPeriod,
  Room,
} from "@/db/init";
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
              model: Contract,
              as: "contracts",
            },
            {
              model: RentalItem,
              as: "rentalItems",
              include: {
                model: RentalPeriod,
                as: "rentalPeriod",
              }
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
          model: Contract,
          as: "contracts",
        },
        {
          model: RentalItem,
          as: "rentalItems",
          include: {
            model: RentalPeriod,
            as: "rentalPeriod",
          }
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
                include: [{
                  model: Document,
                  as: "documents",
                }, {
                  model: Contract,
                  as: "contracts",
                }],
              },
            },
            {
              model: Contract,
              as: "contracts",
            },
            {
              model: RentalItem,
              as: "rentalItems",
              include: {
                model: RentalPeriod,
                as: "rentalPeriod",
              }
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
          model: Contract,
          as: "contracts",
        },
        {
          model: RentalItem,
          as: "rentalItems",
          include: {
            model: RentalPeriod,
            as: "rentalPeriod",
          }
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

export async function getPropertiesActive() {
  try {
    const properties = await Property.findAll({
      where: { isActive: true, status: { [Op.ne]: "DELETED" } },
    });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las propiedades" },
      { status: 500 }
    );
  }
}

export async function getPropertiesInactive() {
  try {
    const properties = await Property.findAll({ where: { isActive: false } });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las propiedades" },
      { status: 500 }
    );
  }
}

export async function getPropertiesByCategory(category) {
  if (!category)
    return NextResponse.json(
      { error: "Se requiere la categoria" },
      { status: 400 }
    );
  try {
    const properties = await Property.findAll({ where: { category } });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las propiedades" },
      { status: 500 }
    );
  }
}

export async function getAllPropertiesSimple() {
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
        "price"
      ],
      where: { status: { [Op.ne]: "DELETED" } },
      include: [
        { model: Owner, as: "owner", attributes: ["email", "id"] },
        { model: Room, as: "rooms", attributes: ["id","serial"] },
        {model: RentalItem,as :"rentalItems", include:{model:RentalPeriod,as:"rentalPeriod"}},
      ],
    });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {

    console.log(error)

    return NextResponse.json(
      { error: "Error al obtener las propiedades", error },
      { status: 500 }
    );
  }
}
