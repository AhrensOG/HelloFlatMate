import connection from "@/db";
import { Supply, RentPayment, sequelize } from "@/db/init";
import { NextResponse } from "next/server";

// Tipos que se borran en RentPayment
const RENT_TYPES = new Set(["MONTHLY", "RESERVATION"]);
// Tipos que se borran en Supply
const SUPPLY_TYPES = new Set(["SUPPLY"]);

export async function deleteSelectedPayments(req) {
  let tx;
  try {
    const payments = await req.json();

    // --- Validaciones base ---
    if (!Array.isArray(payments) || payments.length === 0) {
      return NextResponse.json(
        { error: "No se proporcionaron cobros válidos." },
        { status: 400 }
      );
    }

    // Normalizar y validar cada item
    const normalized = [];
    for (const item of payments) {
      const paymentIdRaw = item?.paymentId;
      const paymentTypeRaw = String(item?.paymentType || "")
        .trim()
        .toUpperCase();

      if (paymentIdRaw === undefined || paymentIdRaw === null) {
        return NextResponse.json(
          { error: "Cada elemento debe incluir 'paymentId'." },
          { status: 400 }
        );
      }

      const paymentId = Number(paymentIdRaw);
      if (!Number.isFinite(paymentId) || paymentId <= 0) {
        return NextResponse.json(
          { error: `paymentId inválido: ${paymentIdRaw}` },
          { status: 400 }
        );
      }

      if (!paymentTypeRaw) {
        return NextResponse.json(
          { error: "Cada elemento debe incluir 'paymentType'." },
          { status: 400 }
        );
      }

      // Solo aceptamos SUPPLY, MONTHLY, RESERVATION
      if (
        !SUPPLY_TYPES.has(paymentTypeRaw) &&
        !RENT_TYPES.has(paymentTypeRaw)
      ) {
        return NextResponse.json(
          { error: `paymentType no soportado: ${paymentTypeRaw}` },
          { status: 400 }
        );
      }

      normalized.push({ paymentId, paymentType: paymentTypeRaw });
    }

    // --- Agrupar por modelo ---
    const supplyIds = [];
    const rentIds = [];

    for (const { paymentId, paymentType } of normalized) {
      if (SUPPLY_TYPES.has(paymentType)) {
        supplyIds.push(paymentId);
      } else if (RENT_TYPES.has(paymentType)) {
        rentIds.push(paymentId);
      }
    }

    if (supplyIds.length === 0 && rentIds.length === 0) {
      return NextResponse.json(
        { error: "No hay elementos válidos para eliminar." },
        { status: 400 }
      );
    }

    // Eliminar duplicados para evitar ruido
    const uniq = (arr) => Array.from(new Set(arr));
    const supplyIdsUniq = uniq(supplyIds);
    const rentIdsUniq = uniq(rentIds);

    // --- Transacción ---
    tx = await connection.transaction();

    // Pre-chequeo: qué existe y qué no
    const existingSupplies = supplyIdsUniq.length
      ? await Supply.findAll({
          where: { id: supplyIdsUniq },
          attributes: ["id"],
          transaction: tx,
        })
      : [];
    const existingRent = rentIdsUniq.length
      ? await RentPayment.findAll({
          where: { id: rentIdsUniq },
          attributes: ["id"],
          transaction: tx,
        })
      : [];

    const existingSupplyIds = new Set(
      existingSupplies.map((r) => Number(r.id))
    );
    const existingRentIds = new Set(existingRent.map((r) => Number(r.id)));

    const notFound = {
      supplies: supplyIdsUniq.filter((id) => !existingSupplyIds.has(id)),
      rentPayments: rentIdsUniq.filter((id) => !existingRentIds.has(id)),
    };

    // Ejecutar deletes (soft o hard según config del modelo)
    let deletedSupplies = 0;
    let deletedRentPayments = 0;

    if (existingSupplyIds.size > 0) {
      deletedSupplies = await Supply.destroy({
        where: { id: Array.from(existingSupplyIds) },
        transaction: tx,
        individualHooks: true, // por si tienes hooks/cascade/softdelete
      });
    }

    if (existingRentIds.size > 0) {
      deletedRentPayments = await RentPayment.destroy({
        where: { id: Array.from(existingRentIds) },
        transaction: tx,
        individualHooks: true,
      });
    }

    await tx.commit();

    return NextResponse.json(
      {
        message: "Eliminación completada",
        deleted: {
          supplies: deletedSupplies,
          rentPayments: deletedRentPayments,
        },
        notFound,
      },
      { status: 200 }
    );
  } catch (error) {
    if (tx) {
      try {
        await tx.rollback();
      } catch (_) {
        // noop
      }
    }
    return NextResponse.json(
      { error: `Error al eliminar: ${error?.message || "desconocido"}` },
      { status: 500 }
    );
  }
}
