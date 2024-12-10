import { NextResponse } from "next/server";
import { Category } from "@/db/init";

export async function deleteCategory(id) {
    try {
        await Category.destroy({ where: { id } });
        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
