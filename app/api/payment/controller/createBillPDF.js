import { Client, LeaseOrderProperty, LeaseOrderRoom, Property, RentPayment, Room } from "@/db/init";
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
    if (!data.leaseOrderId || data.leaseOrderId <= 0) return NextResponse.json({ error: "No lease order id provided" }, { status: 400 });
    if (!data.rentPaymentId || data.rentPaymentId <= 0) return NextResponse.json({ error: "No rent payment id provided" }, { status: 400 });
    if (!data.quotaNumber || data.quotaNumber <= 0) return NextResponse.json({ error: "No quota number provided" }, { status: 400 });

    try {
        const client = await Client.findByPk(data.userId);
        if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
        let leaseOrder;
        let property;
        let room;
        if (data.paymentableType === "PROPERTY") {
            property = await Property.findByPk(data.propertyId);
            leaseOrder = await LeaseOrderProperty.findByPk(data.leaseOrderId);
        } else {
            room = await Room.findByPk(data.propertyId, {
                include: {
                    model: Property,
                    as: "property",
                },
            });
            leaseOrder = await LeaseOrderRoom.findByPk(data.leaseOrderId);
        }
        if (!property && !room && !leaseOrder) return NextResponse.json({ error: "Property or Lease order not found" }, { status: 404 });

        const rentPayments = await RentPayment.findAll({
            where: { paymentableId: data.roomId || data.propertyId, paymentableType: data.paymentableType.toUpperCase(), clientId: data.userId },
        });
        let pdfData;

        const detailsPayments = rentPayments
            .map((payment) => {
                return { amount: payment.amount, date: payment.date, status: payment.status, id: payment.id, quotaNumber: payment.quotaNumber };
            })
            .sort((a, b) => {
                return b.quotaNumber - a.quotaNumber;
            })
            .filter((payment) => payment.quotaNumber <= data.quotaNumber);

        pdfData = {
            id: data.rentPaymentId,
            clienteName: client.name + " " + client.lastName || "N/A",
            clienteDni: client.idNum || "N/A",
            clienteAddress: client.street + " " + client.streetNumber || "N/A",
            clienteCity: client.city + " " + "CP: " + client.postalCode || "N/A",
            clientePhone: client.phone || "N/A",
            clienteEmail: client.email || "N/A",
            room: room
                ? room.property?.street + " " + room.property?.streetNumber + " " + "P" + room.property?.floor
                : property.street + " " + property.streetNumber,
            roomCode: room ? room.serial : property.serial,
            gender: `${room ? room.property?.typology : property.typology}`,
            invoiceNumber: data.rentPaymentId,
            invoicePeriod: formatDate(leaseOrder.startDate) + " / " + formatDate(leaseOrder.endDate),
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
        console.log(error);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
