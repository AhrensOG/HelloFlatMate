import { Property, Consumption, Room, LeaseOrderRoom, Client } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function createPropertyConsumption(data) {
  if (
    !data ||
    !data.propertyId ||
    data.amount <= 0 ||
    !data.startDate ||
    !data.endDate
  ) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const consumptionStart = new Date(data.startDate);
  const consumptionEnd = new Date(data.endDate);

  if (consumptionStart > consumptionEnd) {
    return NextResponse.json(
      { error: "Rango de fechas inválido" },
      { status: 400 },
    );
  }

  try {
    const rooms = await Room.findAll({
      where: { propertyId: data.propertyId },
      attributes: ["id", "serial"],
    });

    if (!rooms.length) {
      return NextResponse.json(
        { error: "No hay habitaciones en esta propiedad" },
        { status: 400 },
      );
    }

    const roomIds = rooms.map((r) => r.id);

    const leases = await LeaseOrderRoom.findAll({
      where: {
        roomId: { [Op.in]: roomIds },
        status: { [Op.ne]: "CANCELED" },
      },
      include: [
        {
          model: Client,
          as: "client",
          attributes: ["id"],
        },
      ],
    });

    const resolvedLeases = [];

    for (const room of rooms) {
      const roomLeases = leases.filter(
        (l) =>
          l.roomId === room.id &&
          new Date(l.startDate) <= consumptionStart &&
          new Date(l.endDate) >= consumptionEnd,
      );

      if (roomLeases.length === 0) {
        // Habitación sin inquilino en este periodo → no participa
        continue;
      }

      if (roomLeases.length > 1) {
        return NextResponse.json(
          {
            error: `Múltiples contratos válidos para la habitación ${room.serial} (ID: ${room.id})`,
          },
          { status: 400 },
        );
      }

      const lease = roomLeases[0];

      if (!lease.client?.id) {
        continue;
      }

      resolvedLeases.push({
        leaseOrderId: lease.id,
        clientId: lease.client.id,
      });
    }

    if (!resolvedLeases.length) {
      return NextResponse.json(
        { error: "No hay inquilinos / contratos válidos para este consumo" },
        { status: 400 },
      );
    }

    const splitAmount = Number(
      (data.amount / resolvedLeases.length).toFixed(2),
    );

    const consumptions = [];

    for (const { leaseOrderId, clientId } of resolvedLeases) {
      const consumption = await Consumption.create({
        leaseOrderRoomId: leaseOrderId,
        clientId,
        amount: splitAmount,
        type: data.type,
        url: data.url || null,
        period: data.period || null,
        startDate: consumptionStart,
        endDate: consumptionEnd,
        date: new Date(),
      });

      consumptions.push(consumption.toJSON());
    }

    return NextResponse.json(
      { message: "Consumos creados", consumptions },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando consumos" },
      { status: 500 },
    );
  }
}
