import { RentalDayPrice } from "@/db/init";
import { Op } from "sequelize";

export async function upsertRentalDayPrice(data) {
  const { rentalItemId, startDate, endDate, price } = data;

  if (!rentalItemId || !startDate || !endDate || !price) {
    return new Response(JSON.stringify({ error: "Datos incompletos" }), {
      status: 400,
    });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    return new Response(JSON.stringify({ error: "Fechas inválidas" }), {
      status: 400,
    });
  }

  const dayPrices = [];
  let current = new Date(start);

  while (current <= end) {
    const dateStr = [
      current.getFullYear(),
      String(current.getMonth() + 1).padStart(2, "0"),
      String(current.getDate()).padStart(2, "0"),
    ].join("-");

    dayPrices.push({ date: dateStr, price });
    current.setDate(current.getDate() + 1);
  }

  // Buscar los ya existentes
  const existing = await RentalDayPrice.findAll({
    where: {
      rentalItemId,
      date: {
        [Op.between]: [dayPrices[0].date, dayPrices[dayPrices.length - 1].date],
      },
    },
  });

  const updates = [];
  const inserts = [];

  for (const dp of dayPrices) {
    const exists = existing.find((e) => e.date === dp.date);
    if (exists) {
      updates.push(
        RentalDayPrice.update({ price: dp.price }, { where: { id: exists.id } })
      );
    } else {
      inserts.push({
        rentalItemId,
        date: dp.date,
        price: dp.price,
      });
    }
  }

  // Ejecutar updates
  await Promise.all(updates);

  // Bulk insert nuevos
  if (inserts.length > 0) {
    await RentalDayPrice.bulkCreate(inserts);
  }

  return new Response(
    JSON.stringify({
      message: "Precios actualizados correctamente",
      updated: updates.length,
      inserted: inserts.length,
    }),
    { status: 200 }
  );
}
