import { Owner, OwnerContract, Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllOwnerContracts() {
  try {
    const ownerContracts = await OwnerContract.findAll({
      include: [
        {
          model: Owner,
          as: "owner",
          attributes: ["name", "lastName"],
        },
        {
          model: Property,
          as: "property",
          attributes: ["serial"],
        },
      ],
    });
    return NextResponse.json(ownerContracts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
