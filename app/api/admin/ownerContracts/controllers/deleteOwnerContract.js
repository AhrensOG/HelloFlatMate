import { OwnerContract } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteOwnerContract(id) {
  try {
    await OwnerContract.destroy({ where: { id } });

    return NextResponse.json("Deleted successfully", { status: 201 });
  } catch (error) {
    console.error("Error creando contrato:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
