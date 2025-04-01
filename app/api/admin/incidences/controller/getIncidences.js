import { Incidence, Owner, Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function getIncidences() {
    try {
        const incidences = await Incidence.findAll({
            include: [
                {
                    model: Property,
                    as: "property",
                    attributes: ["serial"],
                },
                {
                    model: Owner,
                    as: "owner",
                    attributes: ["name", "lastName"],
                },
            ],
        });
        return NextResponse.json(incidences);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
