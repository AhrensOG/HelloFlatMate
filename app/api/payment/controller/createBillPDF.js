import { Client, Property, RentPayment, Room } from "@/db/init";
import { NextResponse } from "next/server";
import { billBuilder } from "../../pdf_creator/utils/billBuilder";

const formatDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Meses empiezan desde 0
    const day = String(newDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export async function createClientBillPDF(data) {
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.userId || data.userId.trim() === "") return NextResponse.json({ error: "No user id provided" }, { status: 400 });
    if (!data.propertyId || data.propertyId <= 0) return NextResponse.json({ error: "No property id provided" }, { status: 400 });
    if (!data.paymentableType || data.paymentableType.trim() === "" || (data.paymentableType !== "PROPERTY" && data.paymentableType !== "ROOM"))
        return NextResponse.json({ error: "No paymentable type provided" }, { status: 400 });

    try {
        const client = await Client.findByPk(data.userId);
        if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
        let property;
        let room;
        if (data.paymentableType === "PROPERTY") {
            console.log("aqui toy");

            property = await Property.findByPk(data.propertyId);
        } else {
            console.log("nop aqui");

            room = await Room.findByPk(data.propertyId, {
                include: {
                    model: Property,
                    as: "property",
                },
            });
        }
        if (!property && !room) return NextResponse.json({ error: "Property not found" }, { status: 404 });

        const rentPayments = await RentPayment.findAll({
            where: { paymentableId: data.roomId || data.propertyId, paymentableType: data.paymentableType.toUpperCase(), clientId: data.userId },
        });
        let pdfData;

        const detailsPayments = rentPayments
            .map((payment) => {
                return { amount: payment.amount, date: payment.date, status: payment.status, id: payment.id };
            })
            .sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
        pdfData = {
            id: detailsPayments[detailsPayments.length - 1].id,
            clienteName: client.name + " " + client.lastName || "N/A",
            clienteDni: client.dni || "N/A",
            clienteAddress: client.street + " " + client.streetNumber || "N/A",
            clienteCity: client.city + " " + "CD: " + client.postalCode || "N/A",
            clientePhone: client.phone || "N/A",
            clienteEmail: client.email || "N/A",
            room: room
                ? room.property.street + " " + room.property.streetNumber + " " + room.floor + " " + room.door
                : property.street + " " + property.streetNumber,
            roomCode: room ? room.serial : property.serial,
            gender: `Alquier ${room ? room.typology : property.typology}`,
            invoiceNumber: detailsPayments[detailsPayments.length - 1].id,
            invoicePeriod:
                detailsPayments.length > 2
                    ? formatDate(new Date(detailsPayments[detailsPayments.length - 2].date)) +
                      "/" +
                      formatDate(new Date(detailsPayments[detailsPayments.length - 1].date))
                    : formatDate(
                          new Date(detailsPayments[detailsPayments.length - 1].date).setMonth(
                              new Date(detailsPayments[detailsPayments.length - 1].date).getMonth() - 1
                          )
                      ) +
                      "/" +
                      formatDate(new Date(detailsPayments[detailsPayments.length - 1].date)),
            details: detailsPayments,
            totalAmount: detailsPayments.reduce((total, payment) => total + payment.amount, 0),
        };
        const pdfStream = await billBuilder(pdfData);
        return new NextResponse(pdfStream, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="contrato.pdf"',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
