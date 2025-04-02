import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
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

    await sendMailFunction({
      to: process.env.HFM_MAIL,
      subject: `Solicitud de ayuda (búsqueda de alojamiento)`,
      html: `
        <p>El usuario <strong>${client.name} ${client.lastName} - ( ${client.email} )</strong> ha solicitado ayuda para encontrar un alojamiento.</p>
        <p><strong>Detalles de la solicitud:</strong></p>
        <ul>
        <li><strong>Tipo de alojamiento:</strong> ${category || "No ingresado"}</li>
          <li><strong>Preferencias:</strong> ${preferences || "No ingresado"}</li>
          <li><strong>Fecha de alquiler:</strong> ${rentalPeriod || "No ingresado"}</li>
          <li><strong>Tipo de alquiler:</strong> ${type || "No ingresado"}</li>
          <li><strong>Zona:</strong> ${zone || "No ingresado"}</li>
          <li><strong>Fecha de ingreso:</strong> ${startDate || "No ingresado"}</li>
          <li><strong>Fecha de salida:</strong> ${endDate || "No ingresado"}</li>
          <li><strong>Numero de ocupantes:</strong> ${
            numberOccupants || "No ingresado"
          }</li>
        </ul>
      `,
    });

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
