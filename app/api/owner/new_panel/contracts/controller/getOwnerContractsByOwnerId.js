import { OwnerContract, Property, Room } from "@/db/init";
import { NextResponse } from "next/server";

export async function getOwnerContractsByOwnerId(id) {
  try {
    const contracts = await OwnerContract.findAll({
      where: { ownerId: id },
      attributes: [
        "id",
        "startDate",
        "endDate",
        "signedPdfUrl",
        "signedAt",
        "status",
        "isSigned",
      ],
      include: [
        {
          model: Property,
          as: "property",
          attributes: [
            "serial",
            "street",
            "streetNumber",
            "city",
            "postalCode",
          ],
        },
      ],
    });

    return NextResponse.json(contracts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las propiedades" },
      { status: 500 }
    );
  }
}
