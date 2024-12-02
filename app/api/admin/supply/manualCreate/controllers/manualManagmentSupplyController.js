import { Supply } from "@/db/init"; // Importar el modelo Supply desde tu ORM (Sequelize)
import { NextResponse } from "next/server";

export async function manualCreateSupply(data) {
  if (!data)
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  if (!data.name || data.name.trim() === "")
    return NextResponse.json({ error: "No title provided" }, { status: 400 });
  if (!data.amount || data.amount <= 0)
    return NextResponse.json(
      { error: "Invalid amount provided" },
      { status: 400 }
    );
  if (!data.propertyId)
    return NextResponse.json(
      { error: "No property ID provided" },
      { status: 400 }
    );
  if (!data.clientId)
    return NextResponse.json(
      { error: "No client ID provided" },
      { status: 400 }
    );

  try {
    // Crear el registro de Supply
    const supply = await Supply.create({
      name: data.name,
      amount: data.amount,
      status: data.status, // El estado por defecto es 'APPROVED'
      type: data.type,
      reference: data.reference || "",
      date: new Date(data.date),
      expirationDate: new Date(data.expirationDate),
      paymentDate:
        !data.paymentDate || data.paymentDate === "" ? null : data.paymentDate,
      paymentId:
        !data.paymentId || data.paymentId === "" ? null : data.paymentId,
      clientId: data.clientId,
      propertyId: data.propertyId,
    });
    console.log(data);
    return NextResponse.json(supply.toJSON(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function manualUpdateSupply(data) {
  if (!data.id)
    return NextResponse.json(
      { error: "No supply ID provided" },
      { status: 400 }
    );

  // Verificar los campos básicos
  if (data.name && data.name.trim() === "")
    return NextResponse.json(
      { error: "Invalid title provided" },
      { status: 400 }
    );
  if (data.amount < 0)
    return NextResponse.json(
      { error: "Invalid amount provided" },
      { status: 400 }
    );

  try {
    // Buscar el registro de Supply
    const supply = await Supply.findByPk(data.id);

    if (!supply) {
      return NextResponse.json({ error: "Supply not found" }, { status: 404 });
    }

    // Actualizar los campos proporcionados
    await supply.update({
      name: data.name || supply.name,
      amount: data.amount || supply.amount,
      status: data.status || supply.status,
      type: data.type || supply.type,
      reference: data.reference || supply.reference,
      expirationDate:
        data.expirationDate && data.expirationDate !== ""
          ? new Date(data.expirationDate)
          : data.expirationDate === ""
          ? null
          : supply.expirationDate,
      paymentDate:
        data.paymentDate && data.paymentDate !== ""
          ? new Date(data.paymentDate)
          : data.paymentDate === ""
          ? null
          : supply.paymentDate,
      paymentId: data.paymentId
        ? data.paymentId
        : data.paymentId === ""
        ? null
        : supply.paymentId,
      clientId: data.clientId || supply.clientId,
      propertyId: data.propertyId || supply.propertyId,
    });

    return NextResponse.json(supply.toJSON(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function deleteSupply(supplyId) {
  if (!supplyId) {
    return NextResponse.json(
      { error: "No supply ID provided" },
      { status: 400 }
    );
  }

  try {
    const supply = await Supply.findByPk(supplyId);

    if (!supply) {
      return NextResponse.json({ error: "Supply not found" }, { status: 404 });
    }

    await supply.destroy();

    return NextResponse.json(
      { message: "Supply deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
