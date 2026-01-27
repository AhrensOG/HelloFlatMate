import { Room, LeaseOrderRoom, Client, Consumption, Supply } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function getSummaryPropertyById(propertyId) {
  try {
    const today = new Date();

    if (!propertyId) {
      return NextResponse.json(
        { error: "PropertyId es requerido" },
        { status: 400 },
      );
    }

    // 1. Obtener habitaciones de la propiedad
    const rooms = await Room.findAll({
      where: { propertyId },
      attributes: ["id", "serial"],
      raw: true,
    });

    if (!rooms.length) return NextResponse.json([], { status: 200 });
    const roomIds = rooms.map((r) => r.id);

    // 2. Obtener TODAS las Lease con status APPROVED para esas habitaciones
    // Confiamos en que el admin ya pasó a FINISHED las anteriores.
    const activeLeases = await LeaseOrderRoom.findAll({
      where: {
        roomId: roomIds,
        status: "APPROVED",
        startDate: {
          [Op.lte]: today, // startDate debe ser menor o igual a hoy
        },
        endDate: {
          [Op.gte]: today, // endDate debe ser mayor o igual a hoy
        },
      },
      attributes: [
        "id",
        "startDate",
        "endDate",
        "status",
        "clientId",
        "roomId",
      ],
      raw: true,
    });

    if (!activeLeases.length) {
      return NextResponse.json(
        rooms.map((r) => ({ ...r, activeLease: null })),
        { status: 200 },
      );
    }

    const clientIds = activeLeases.map((l) => l.clientId);
    const leaseIds = activeLeases.map((l) => l.id);

    // 3. Consultas paralelas para Clientes, Consumos y Suministros
    const [clients, consumptions, supplies] = await Promise.all([
      Client.findAll({
        where: { id: clientIds },
        attributes: ["id", "name", "lastName", "email"],
        raw: true,
      }),
      Consumption.findAll({
        where: { leaseOrderRoomId: leaseIds },
        attributes: ["amount", "period", "leaseOrderRoomId"],
        raw: true,
      }),
      Supply.findAll({
        where: {
          leaseOrderId: leaseIds,
          type: "GENERAL_SUPPLIES",
        },
        attributes: ["amount", "status", "leaseOrderId"],
        raw: true,
      }),
    ]);

    // 4. Combinar la información
    const finalData = rooms.map((room) => {
      const lease = activeLeases.find((l) => l.roomId === room.id);

      if (!lease) return { ...room, activeLease: null };

      const client_info = clients.find((c) => c.id === lease.clientId);
      const consumption_info = consumptions.filter(
        (c) => c.leaseOrderRoomId === lease.id,
      );
      const supplies_info = supplies.filter((s) => s.leaseOrderId === lease.id);

      return {
        ...room,
        activeLease: {
          ...lease,
          client: client_info,
          consumptions: consumption_info,
          supplies: supplies_info,
        },
      };
    });

    return NextResponse.json(finalData, { status: 200 });
  } catch (error) {
    console.error("Error en getSummaryPropertyById:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
