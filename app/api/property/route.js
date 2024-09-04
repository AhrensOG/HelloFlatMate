import { getAllProperties, getPropertyById } from './controller/getPropertyController';
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
        const result = await getPropertyById(id);
        return result
    }
    const result = await getAllProperties();
    return result
}
