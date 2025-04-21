import { OwnerContract } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateOwnerContract(data) {
  try {
    const existingContract = await OwnerContract.findByPk(data.id);

    if (!existingContract) {
      return NextResponse.json(
        { error: "Contrato no encontrado" },
        { status: 404 }
      );
    }

    // Solo actualizamos los campos permitidos
    await existingContract.update({
      status: data.status ?? existingContract.status,
      isSigned: data.isSigned ?? existingContract.isSigned,
      startDate: data.startDate ?? existingContract.startDate,
      endDate: data.endDate ?? existingContract.endDate,
      durationMonths: data.durationMonths ?? existingContract.durationMonths,
      iban: data.iban ?? existingContract.iban,
      fixedMonthlyRentPerRoom:
        existingContract.category === "HELLO_ROOM"
          ? data.fixedMonthlyRentPerRoom ??
            existingContract.fixedMonthlyRentPerRoom
          : null,
      fixedMonthlyRentTotal:
        existingContract.category === "HELLO_ROOM"
          ? data.fixedMonthlyRentTotal ?? existingContract.fixedMonthlyRentTotal
          : null,
      includesPremiumServices:
        data.includesPremiumServices ??
        existingContract.includesPremiumServices,
      url: data.url ?? existingContract.url,
      signedAt: data.signedAt ?? existingContract.signedAt,
      notifiedAt: data.notifiedAt ?? existingContract.notifiedAt,
      rooms:
        existingContract.category !== "HELLO_ROOM"
          ? data.rooms ?? existingContract.rooms
          : null,
    });

    return NextResponse.json(existingContract);
  } catch (error) {
    console.error("Error actualizando contrato:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
