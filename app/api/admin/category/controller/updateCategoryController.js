import { NextResponse } from "next/server";
import { Category } from "@/db/init";

export async function updateCategory(id, data) {
    if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
    if (!data) return NextResponse.json({ error: "No data provided" }, { status: 400 });
    if (!data.name || data.name.trim() === "") return NextResponse.json({ error: "No category name provided" }, { status: 400 });

    try {
        const category = await Category.findByPk(id);
        if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
        category.name = data.name;
        await category.save();
        return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
