import { Owner, Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function getOwnerForContractByProperty(id) {
    if (!id) {
        return NextResponse.json(
            { error: "Se requiere el id" },
            { status: 400 }
        );
    }
    try {
        const owner = await Owner.findOne({
            include: {
                model: Property,
                as: "properties",
                where: {
                    id,
                },
                attributes: ["id"],
            },
        });
        return NextResponse.json(owner, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
