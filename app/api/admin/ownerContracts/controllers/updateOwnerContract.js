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

    // Actualizar campos relevantes
    await existingContract.update({
      status: data.status ?? existingContract.status,
      isSigned: data.isSigned ?? existingContract.isSigned,
      startDate: data.startDate ?? existingContract.startDate,
      endDate: data.endDate ?? existingContract.endDate,
      originalPdfUrl: data.originalPdfUrl ?? existingContract.originalPdfUrl,
      signedPdfUrl: data.signedPdfUrl ?? existingContract.signedPdfUrl,
      ownerFdoData: data.ownerFdoData ?? existingContract.ownerFdoData,
      hfmFdoData: data.hfmFdoData ?? existingContract.hfmFdoData,
      signedAt: data.signedAt ?? existingContract.signedAt,
    });

    return NextResponse.json(existingContract);
  } catch (error) {
    console.error("Error actualizando contrato:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
