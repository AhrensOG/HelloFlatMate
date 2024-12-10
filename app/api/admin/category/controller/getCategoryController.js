import { Category } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllCategory() {
    try {
        const categories = await Category.findAll();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function getCategoryById(id) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    try {
        const category = await Category.findByPk(id);
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
