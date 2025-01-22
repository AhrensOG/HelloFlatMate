import { Client, LeaseOrderRoom, Property, RentPayment } from "@/db/init";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all clients and include LeaseOrderRoom
    const clients = await Client.findAll({
      include: [
        {
          model: LeaseOrderRoom,
          as: "leaseOrdersRoom",
          where: { isActive: true },
          include: [
            {
              model: Property,
              as: "property",
              attributes: ["category"],
            },
          ],
        },
      ],
    });

    const paymentsToAdd = [];

    for (const client of clients) {
      const { leaseOrdersRoom } = client;

      for (const leaseOrder of leaseOrdersRoom) {
        const startDate = new Date(leaseOrder.startDate);
        const endDate = new Date(leaseOrder.endDate);

        // Calculate the duration in months
        const totalMonths =
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          endDate.getMonth() -
          startDate.getMonth() +
          1;

        // Fetch all RentPayments for this lease order
        const rentPayments = await RentPayment.findAll({
          where: { leaseOrderId: leaseOrder.id },
        });

        const paidQuotas = rentPayments.map((payment) => payment.quotaNumber);

        for (let quota = 1; quota <= totalMonths; quota++) {
          if (leaseOrder.property?.category === "HELLO_LANDLORD") {
            continue;
          }

          if (!paidQuotas.includes(quota)) {
            const paymentMonth = new Date(
              startDate.getFullYear(),
              startDate.getMonth() + quota - 1
            );

            paymentsToAdd.push({
              paymentableId: leaseOrder.roomId,
              paymentableType: "ROOM",
              leaseOrderId: leaseOrder.id,
              leaseOrderType: "ROOM",
              clientId: client.id,
              quotaNumber: quota,
              type: quota === 1 ? "RESERVATION" : "MONTHLY",
              amount: leaseOrder.price,
              paymentId: "-",
              date: new Date(),
              status: "PENDING",
              ownerId: leaseOrder.ownerId,
              description: `Pago mensual - ${paymentMonth
                .toLocaleString("es-ES", {
                  month: "long",
                })
                .replace(/^./, (char) =>
                  char.toUpperCase()
                )} ${paymentMonth.getFullYear()}`,
            });
          }
        }
      }
    }

    if (paymentsToAdd.length > 0) {
      await RentPayment.bulkCreate(paymentsToAdd);
    }

    return NextResponse.json(
      {
        message: paymentsToAdd.length
          ? "Missing rent payments have been added."
          : "No missing rent payments to add.",
        addedPayments: paymentsToAdd,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
