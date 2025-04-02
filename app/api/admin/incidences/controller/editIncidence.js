import { Incidence } from "@/db/init";
import { NextResponse } from "next/server";

export async function editIncidence(data) {
    const { id, amount, date, url, type, title, description } = data;

    if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const sanitize = (value) => {
        return value === undefined || value === null || value === ""
            ? null
            : value;
    };

    try {
        const updated = await Incidence.update(
            {
                amount: sanitize(amount),
                date: sanitize(date),
                url: sanitize(url),
                type: sanitize(type),
                title: sanitize(title),
                description: sanitize(description),
            },
            {
                where: { id },
            }
        );

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
