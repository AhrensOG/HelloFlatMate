import { Owner, Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function getSimpleOwnersWithProperties() {
  try {
    const owners = await Owner.findAll({
      attributes: ["id", "name", "lastName", "email"],
      include: [
        {
          model: Property,
          as: "properties",
          attributes: ["id", "serial"],
        },
      ],
    });

    return NextResponse.json(owners);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
