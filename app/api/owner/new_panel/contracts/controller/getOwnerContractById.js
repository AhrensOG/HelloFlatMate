import { OwnerContract } from "@/db/init";
import { NextResponse } from "next/server";

export async function getOwnerContractById(id) {
  try {
    const contract = await OwnerContract.findByPk(id, {
      attributes: [
        "id",
        "originalPdfUrl",
        "ownerId",
        "ownerFdoData",
        "hfmFdoData",
        "startDate",
        "endDate",
        "isSigned",
      ],
    });

    return NextResponse.json(contract, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las propiedades" },
      { status: 500 }
    );
  }
}
