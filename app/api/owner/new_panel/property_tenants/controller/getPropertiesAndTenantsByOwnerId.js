import {
    Client,
    Consumption,
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

export async function getPropertiesAndTenantsByOwnerId(id) {
    try {
        const properties = await Property.findAll({
            attributes: [
                "id",
                "serial",
                "category",
                "status",
                "street",
                "streetNumber",
                "city",
                "postalCode",
                "zone",
                "typology",
            ],
            where: { status: { [Op.ne]: "DELETED" }, ownerId: id },
            include: [
                {
                    model: Room,
                    as: "rooms",
                    attributes: ["serial", "isActive"],
                    include: [
                        {
                            model: LeaseOrderRoom,
                            as: "leaseOrdersRoom",
                            attributes: [
                                "id",
                                "startDate",
                                "endDate",
                                "date",
                                "price",
                                "status",
                                "isActive",
                            ],
                            include: {
                                model: Client,
                                as: "client",
                                attributes: [
                                    "id",
                                    "name",
                                    "lastName",
                                    "email",
                                    "phone",
                                    "emergencyName",
                                    "emergencyPhone",
                                    "emergencyEmail",
                                ],
                                include: [
                                    {
                                        model: Document,
                                        as: "documents",
                                        attributes: [
                                            "name",
                                            "urls",
                                            "leaseOrderId",
                                        ],
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
                                            "status",
                                            "type",
                                            "paymentId",
                                            "leaseOrderId",
                                            "description",
                                        ],
                                    },
                                    {
                                        model: Supply,
                                        as: "supplies",
                                        attributes: [
                                            "name",
                                            "type",
                                            "amount",
                                            "status",
                                            "date",
                                            "paymentId",
                                            "leaseOrderId",
                                        ],
                                    },
                                    {
                                      model: Consumption,
                                      as: "consumptions",
                                      attributes: [
                                        "amount",
                                        "type",
                                        "period",
                                        "startDate",
                                        "endDate",
                                        "url",
                                        "type",
                                      ]
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
