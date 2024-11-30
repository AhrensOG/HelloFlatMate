import { Category } from "@/db/init";
import { NextResponse } from "next/server";

export async function createCategory(data) {
    if (!data) {
        return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }
    if (!data.name || data.name.trim() === "") {
        return NextResponse.json({ message: "No category name provided" }, { status: 400 });
    }

    try {
        const category = await Category.create({ name: data.name });
        return NextResponse.json({ message: "Category created successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
