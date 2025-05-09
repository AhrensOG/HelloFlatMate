import { NextResponse } from "next/server";
import { Admin, Client, Contract, Document, LeaseOrderProperty, LeaseOrderRoom, Payment, Property, RentPayment, Room, Supply } from "@/db/init";

export async function getAllLeaseOrders() {
    try {
        const LeaseOrdersRoom = await LeaseOrderRoom.findAll({
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
                        "country",
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
                        "personalReview",
                        "homeUniversity",
                        "reasonForValencia",
                        "reasonForValenciaOther",
                        "arrivalDate",
                        "arrivalTime",
                    ],
                    include: [
                        { model: Supply, as: "supplies" },
                        { model: RentPayment, as: "rentPayments" },
                        { model: Document, as: "documents" },
                        { model: Contract, as: "contracts" },
                    ],
                },
            ],
            order: [["date", "DESC"]],
        });

        const mapRoomOrders = LeaseOrdersRoom.map((order) => {
            return { ...order.dataValues, type: "room" };
        });
        const LeaseOrders = [...mapRoomOrders];
        return NextResponse.json(LeaseOrders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function getLeaserOrderById(id, type) {
    if (!id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    try {
        if (type === "property") {
            const LeaseOrder = await LeaseOrderProperty.findByPk(id);
            return NextResponse.json(LeaseOrder, { status: 200 });
        }

        const LeaseOrder = await LeaseOrderRoom.findByPk(id);
        return NextResponse.json(LeaseOrder, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
