import { OwnerContract } from "@/db/init";
import { NextResponse } from "next/server";

export async function createOwnerContract(data) {
  try {
    const newContract = await OwnerContract.create({
      ownerId: data.ownerId,
      propertyId: data.propertyId,
      status: data.status ?? "PENDING",
      isSigned: data.isSigned ?? false,
      startDate: data.startDate,
      endDate: data.endDate,
      originalPdfUrl: data.originalPdfUrl ?? null,
      ownerFdoData: data.ownerFdoData ?? null,
      hfmFdoData: data.hfmFdoData ?? null,
      signedAt: data.signedAt ?? null,
    });

    return NextResponse.json(newContract, { status: 201 });
  } catch (error) {
    console.error("Error creando contrato:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
