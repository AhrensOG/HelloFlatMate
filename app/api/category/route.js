import { getAllCategory, getCategoryById } from "./controller/getCategoryController";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
        return await getCategoryById(id);
    }
    return await getAllCategory();
}
