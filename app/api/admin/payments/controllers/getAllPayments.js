import { RentPayment, Supply, Room, Client, LeaseOrderRoom } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllPayments() {
  // Obtener todos los pagos de suministro
  const supplies = await Supply.findAll({attributes:["id", "date", "type", "status", "name", "amount", "paymentId", "leaseOrderId", "leaseOrderType"]});

  // Obtener todos los pagos de alquiler
  const rentPayments = await RentPayment.findAll({attributes:["id", "date", "type", "status", "quotaNumber", "description", "amount", "paymentId", "leaseOrderId", "leaseOrderType"]});

  // Combinar ambos arrays
  const payments = [...supplies, ...rentPayments].map((payment) => ({
    id: payment.id,
    date: payment.date,
    type: payment.type,
    status: payment.status,
    quotaNumber: payment.quotaNumber,
    name: payment.name,
    description: payment.description,
    amount: payment.amount,
    paymentId: payment.paymentId,
    leaseOrderId: payment.leaseOrderId,
    leaseOrderType: payment.leaseOrderType,
    leaseOrderInfo: null,
  }));

  // Obtener LeaseOrderRoom con LeaseOrder y Room incluidos
  const leaseOrders = await LeaseOrderRoom.findAll({
    include: [
      {
        model: Room,
        as: "room",
        attributes: ["serial"],
      },
      {
        model: Client,
        as: "client",
        attributes: ["name", "lastName", "email"],
      },
    ],
    attributes: ["startDate", "endDate", "id"],
  });

  // Mapear la información de leaseOrder en los pagos
  payments.forEach((payment) => {
    if (payment.leaseOrderId) {
      const leaseOrder = leaseOrders.find(
        (order) => order.id === payment.leaseOrderId
      );
      if (leaseOrder) {
        payment.leaseOrderInfo = {
          startDate: leaseOrder.startDate,
          endDate: leaseOrder.endDate,
          room: leaseOrder.room?.serial,
        };
        payment.user = {
          name: leaseOrder.client?.name,
          lastName: leaseOrder.client?.lastName,
          email: leaseOrder.client?.email,
        }
      }
    }
  });

  payments.sort((a, b) => new Date(b.date) - new Date(a.date));

  return NextResponse.json(payments);
}
