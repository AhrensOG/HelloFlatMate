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

export async function getPropertyById(id) {
  try {
    const property = await Property.findByPk(id, {
      attributes: [
        "id",
        "serial",
        "name",
        "status",
        "isActive",
        "price",
        "city",
        "street",
        "streetNumber",
        "postalCode",
        "category",
      ],
      include: [
        {
          model: Room,
          attributes: [
            "id",
            "serial",
            "name",
            "status",
            "isActive",
            "price",
            "propertyId",
          ],
          as: "rooms",
          include: [
            {
              model: LeaseOrderRoom,
              as: "leaseOrdersRoom",
              include: [
                {
                  model: Client,
                  attributes: [
                    "id",
                    "name",
                    "lastName",
                    "email",
                    "emergencyName",
                    "emergencyPhone",
                    "emergencyEmail",
                    "idNum",
                    "birthDate",
                    "genre",
                    "phone",
                    "city",
                    "country",
                    "street",
                    "streetNumber",
                    "postalCode",
                    "signature",
                    "destinationUniversity",
                    "homeUniversity",
                    "reasonForValencia",
                    "reasonForValenciaOther",
                    "personalReview",
                  ],
                  as: "client",
                  include: [
                    {
                      model: Document,
                      as: "documents",
                    },
                    {
                      model: Contract,
                      as: "contracts",
                    },
                  ],
                },
              ],
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
              },
            },
          ],
        },
        {
          model: LeaseOrderProperty,
          as: "leaseOrdersProperty",
          include: {
            model: Client,
            attributes: [
              "id",
              "name",
              "lastName",
              "email",
              "emergencyName",
              "emergencyPhone",
              "emergencyEmail",
              "idNum",
              "birthDate",
              "genre",
              "phone",
              "city",
              "country",
              "street",
              "streetNumber",
              "postalCode",
              "signature",
              "destinationUniversity",
              "homeUniversity",
              "reasonForValencia",
              "reasonForValenciaOther",
              "personalReview",
            ],
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
          },
        },
        {
          model: Owner,
          attributes: ["id", "name", "lastName", "email"],
          as: "owner",
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
    return NextResponse.json(
      { error: "Error al obtener la propiedad" },
      { status: 500 }
    );
  }
}
