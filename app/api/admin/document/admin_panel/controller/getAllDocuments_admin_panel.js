import { Document, Client, Contract, Owner } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllDocuments_admin_panel({
  page = 1,
  limit = 20,
  userId = null,
}) {
  try {
    const offset = (page - 1) * limit;

    // 1. Queries de datos crudos (Raw)
    const docWhere = userId ? { documentableId: userId } : {};
    const contractWhere = userId ? { clientId: userId } : {};

    const [rawDocs, rawContracts] = await Promise.all([
      Document.findAll({ where: docWhere, raw: true }),
      Contract.findAll({
        where: contractWhere,
        include: [
          { model: Owner, as: "owner", attributes: ["id", "name", "lastName"] },
        ],
        raw: true,
        nest: true,
      }),
    ]);

    // 2. Unificar y recolectar IDs de clientes únicos
    const allItems = [
      ...rawDocs.map((d) => ({ ...d, type: d.type || "DOCUMENT" })),
      ...rawContracts.map((c) => ({ ...c, type: "CONTRACT" })),
    ];

    // Recolectamos documentableId y clientId en un solo Set de IDs
    const clientIds = [
      ...new Set(allItems.map((item) => item.documentableId || item.clientId)),
    ].filter(Boolean);

    // 3. Buscar Clientes por separado (Evita el error de documentableType)
    // Usamos any cast o strings según sea necesario para evitar errores de tipo en la DB
    const clients = await Client.findAll({
      where: { id: clientIds },
      attributes: ["id", "name", "lastName", "email"],
      raw: true,
    });

    // Creamos el mapa para cruce de datos veloz
    const clientMap = new Map(clients.map((c) => [String(c.id), c]));

    // 4. Cruzar datos manualmente
    const fullData = allItems.map((item) => {
      const cid = String(item.documentableId || item.clientId);
      return {
        ...item,
        client: clientMap.get(cid) || null,
      };
    });

    // 5. Ordenar por ID descendente
    fullData.sort((a, b) => {
      const idA = parseInt(a.id) || 0;
      const idB = parseInt(b.id) || 0;
      return idB - idA;
    });

    // 6. Paginar
    const total = fullData.length;
    const paginated = fullData.slice(offset, offset + limit);

    return NextResponse.json(
      {
        documents: paginated,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + paginated.length < total,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error en getAllDocuments_admin_panel:", error);
    return NextResponse.json(
      { error: "Error procesando documentos", details: error.message },
      { status: 500 }
    );
  }
}
