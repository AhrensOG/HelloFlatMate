import { SearchRequest, Client } from "@/db/init";
import { NextResponse } from "next/server";

export async function createSearchRequest(data) {
  // Validar entrada esencial
  if (!data || typeof data !== "object") {
    return NextResponse.json(
      { error: "Datos inválidos o faltantes" },
      { status: 400 }
    );
  }

  const {
    clientId,
    name,
    lastName,
    country,
    reasonForValencia,
    reasonForValenciaOther,
    preferences,
    phone,
    email,
    birthDate,
    zone,
    rentalPeriod,
    type,
    category,
    startDate,
    endDate,
    numberOccupants,
  } = data;

  if (!clientId) {
    return NextResponse.json(
      { error: "Se requiere el clientId" },
      { status: 400 }
    );
  }

  // Iniciar transacción
  const transaction = await Client.sequelize.transaction();

  try {
    // Buscar cliente existente
    const client = await Client.findByPk(clientId);

    if (!client) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar campos del cliente si los datos están presentes
    client.name = name || client.name;
    client.lastName = lastName || client.lastName;
    client.country = country || client.country;
    client.reasonForValencia = reasonForValencia || client.reasonForValencia;
    client.reasonForValenciaOther =
      reasonForValenciaOther || client.reasonForValenciaOther;
    client.phone = phone || client.phone;
    client.email = email || client.email;
    client.birthDate = birthDate ? new Date(birthDate) : client.birthDate;

    await client.save({ transaction });

    // Crear el SearchRequest con los datos validados
    const newSearchRequest = await SearchRequest.create(
      {
        clientId,
        preferences: preferences || null,
        zone: zone || null,
        rentalPeriod: rentalPeriod || null,
        type: type || null,
        category: category || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        numberOccupants: numberOccupants || null,
      },
      { transaction }
    );

    // Confirmar la transacción
    await transaction.commit();

    return NextResponse.json(
      {
        message:
          "Cliente y solicitud de búsqueda creados/actualizados con éxito",
        client,
        searchRequest: newSearchRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}