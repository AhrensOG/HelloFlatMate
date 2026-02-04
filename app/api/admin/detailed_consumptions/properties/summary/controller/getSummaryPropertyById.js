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

    // 2. Obtener TODAS las leases de esas habitaciones (sin filtrar por fecha ni status)
    const allLeases = await LeaseOrderRoom.findAll({
      where: {
        roomId: roomIds,
      },
      attributes: [
        "id",
        "startDate",
        "endDate",
        "status",
        "clientId",
        "roomId",
      ],
      order: [
        ["roomId", "ASC"],
        ["startDate", "ASC"],
      ],
      raw: true,
    });

    if (!allLeases.length) {
      return NextResponse.json(
        rooms.map((r) => ({
          ...r,
          currentLease: null,
          previousLease: null,
        })),
        { status: 200 },
      );
    }

    // 3. Agrupar leases por habitación
    const leasesByRoom = new Map();

    for (const lease of allLeases) {
      if (!leasesByRoom.has(lease.roomId)) {
        leasesByRoom.set(lease.roomId, []);
      }
      leasesByRoom.get(lease.roomId).push(lease);
    }

    // 4. Resolver current y previous por habitación
    const roomLeaseMap = new Map();
    const clientIds = new Set();
    const leaseIds = new Set();

    for (const [roomId, leases] of leasesByRoom.entries()) {
      let currentLease = null;
      let previousLease = null;

      for (let i = 0; i < leases.length; i++) {
        const l = leases[i];

        // 1. Resolver CURRENT: debe estar activa en fecha y APPROVED
        if (
          l.status === "APPROVED" &&
          new Date(l.startDate) <= today &&
          new Date(l.endDate) >= today
        ) {
          currentLease = l;

          // 2. Resolver PREVIOUS: buscar hacia atrás la válida
          for (let j = i - 1; j >= 0; j--) {
            const prev = leases[j];

            // Evitar leases con mismo startDate (duplicadas por error)
            if (new Date(prev.endDate) < new Date(currentLease.startDate)) {
              previousLease = prev;
              break;
            }
          }

          break;
        }
      }

      if (currentLease) {
        clientIds.add(currentLease.clientId);
        leaseIds.add(currentLease.id);
      }

      if (previousLease) {
        clientIds.add(previousLease.clientId);
        leaseIds.add(previousLease.id);
      }

      roomLeaseMap.set(roomId, {
        currentLease,
        previousLease,
      });
    }

    // 5. Consultas paralelas para Clientes, Consumos y Suministros
    const [clients, consumptions, supplies] = await Promise.all([
      Client.findAll({
        where: { id: [...clientIds] },
        attributes: ["id", "name", "lastName", "email"],
        raw: true,
      }),
      Consumption.findAll({
        where: { leaseOrderRoomId: [...leaseIds] },
        attributes: ["amount", "period", "leaseOrderRoomId"],
        raw: true,
      }),
      Supply.findAll({
        where: {
          leaseOrderId: [...leaseIds],
          type: "GENERAL_SUPPLIES",
        },
        attributes: ["amount", "status", "leaseOrderId"],
        raw: true,
      }),
    ]);

    // 6. Combinar la información
    const finalData = rooms.map((room) => {
      const leaseInfo = roomLeaseMap.get(room.id);

      if (!leaseInfo) {
        return {
          ...room,
          currentLease: null,
          previousLease: null,
        };
      }

      const enrichLease = (lease) => {
        if (!lease) return null;

        return {
          ...lease,
          client: clients.find((c) => c.id === lease.clientId) || null,
          consumptions: consumptions.filter(
            (c) => c.leaseOrderRoomId === lease.id,
          ),
          supplies: supplies.filter((s) => s.leaseOrderId === lease.id),
        };
      };

      return {
        ...room,
        currentLease: enrichLease(leaseInfo.currentLease),
        previousLease: enrichLease(leaseInfo.previousLease),
      };
    });

    return NextResponse.json(finalData, { status: 200 });
  } catch (error) {
    console.error("Error en getSummaryPropertyById:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
