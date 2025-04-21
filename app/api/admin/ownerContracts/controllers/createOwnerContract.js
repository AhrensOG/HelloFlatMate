import { OwnerContract } from "@/db/init";
import { NextResponse } from "next/server";

export async function createOwnerContract(data) {
  try {
    const newContract = await OwnerContract.create({
      ownerId: data.ownerId,
      propertyId: data.propertyId,
      category: data.category,
      status: data.status ?? "PENDING",
      isSigned: data.isSigned ?? false,
      startDate: data.startDate,
      endDate: data.endDate,
      durationMonths: data.durationMonths,
      iban: data.iban ?? null,
      fixedMonthlyRentPerRoom:
        data.category === "HELLO_ROOM"
          ? data.fixedMonthlyRentPerRoom ?? null
          : null,
      fixedMonthlyRentTotal:
        data.category === "HELLO_ROOM"
          ? data.fixedMonthlyRentTotal ?? null
          : null,
      includesPremiumServices: data.includesPremiumServices ?? false,
      url: data.url ?? null,
      signedAt: data.signedAt ?? null,
      notifiedAt: data.notifiedAt ?? null,
      createdBy: data.createdBy ?? null,
      rooms: data.category !== "HELLO_ROOM" ? data.rooms ?? null : null,
    });

    return NextResponse.json(newContract, { status: 201 });
  } catch (error) {
    console.error("Error creando contrato:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
