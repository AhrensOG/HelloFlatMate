import { Consumption } from "@/db/init";

export async function deleteConsumption(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const consumption = await Consumption.destroy({ where: { id: id } });
        return NextResponse.json(consumption, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
