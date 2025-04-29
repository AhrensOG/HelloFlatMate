import { RentPayment, Supply, Room, Client, LeaseOrderRoom } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllPayments({
  page = 1,
  limit = 100,
  userId = null,
  description = null,
  type = null,
  status = null,
}) {
  // 1. Construir condiciones dinámicas
  const supplyWhere = {};
  const rentWhere = {};

  if (status === "PENDING") {
    supplyWhere.status = "PENDING";
    rentWhere.status = "PENDING";
  } else if (status === "APPROVED" || status === "PAID") {
    supplyWhere.status = "PAID"; // equivalente en Supply
    rentWhere.status = "APPROVED"; // equivalente en RentPayment
  }

  if (type) {
    supplyWhere.type = type;
    rentWhere.type = type;
  }

  // 2. Consultar con filtros
  const [supplies, rentPayments] = await Promise.all([
    Supply.findAll({
      where: Object.keys(supplyWhere).length > 0 ? supplyWhere : undefined,
      attributes: [
        "id",
        "date",
        "type",
        "status",
        "name",
        "amount",
        "paymentId",
        "leaseOrderId",
        "leaseOrderType",
      ],
      raw: true,
    }),
    RentPayment.findAll({
      where: Object.keys(rentWhere).length > 0 ? rentWhere : undefined,
      attributes: [
        "id",
        "date",
        "type",
        "status",
        "quotaNumber",
        "description",
        "amount",
        "paymentId",
        "leaseOrderId",
        "leaseOrderType",
      ],
      raw: true,
    }),
  ]);

  // 2. Combinar pagos
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
    user: null,
  }));

  // 3. Obtener leases con rooms y clientes
  const leaseOrders = await LeaseOrderRoom.findAll({
    include: [
      { model: Room, as: "room", attributes: ["serial"] },
      {
        model: Client,
        as: "client",
        attributes: ["name", "lastName", "email", "id"],
      },
    ],
    attributes: ["startDate", "endDate", "id"],
    raw: true,
    nest: true,
  });

  const leaseOrdersById = new Map();
  for (const lease of leaseOrders) {
    leaseOrdersById.set(lease.id, lease);
  }

  for (const payment of payments) {
    if (payment.leaseOrderId) {
      const leaseOrder = leaseOrdersById.get(payment.leaseOrderId);
      if (leaseOrder) {
        payment.leaseOrderInfo = {
          startDate: leaseOrder.startDate,
          endDate: leaseOrder.endDate,
          room: leaseOrder.room?.serial || null,
        };
        payment.user = leaseOrder.client
          ? {
              name: leaseOrder.client.name,
              lastName: leaseOrder.client.lastName,
              email: leaseOrder.client.email,
              id: leaseOrder.client.id,
            }
          : null;
      }
    }
  }

  // 4. Filtros
  let filteredPayments = payments;

  if (userId) {
    filteredPayments = filteredPayments.filter(
      (payment) => payment.user?.id?.toString() === userId
    );
  }

  if (description) {
    const descLower = description.toLowerCase();
    filteredPayments = filteredPayments.filter((payment) => {
      const descText = (
        payment.description ||
        payment.name ||
        ""
      ).toLowerCase();
      return descText.includes(descLower);
    });
  }

  if (type) {
    filteredPayments = filteredPayments.filter(
      (payment) => payment.type === type
    );
  }

  // 5. Ordenar por fecha
  filteredPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 6. Paginación
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

  // 7. Devolver respuesta
  return NextResponse.json(
    {
      payments: paginatedPayments,
      total: filteredPayments.length,
      page,
      totalPages: Math.ceil(filteredPayments.length / limit),
      hasMore: endIndex < filteredPayments.length,
    },
    {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    }
  );
}
