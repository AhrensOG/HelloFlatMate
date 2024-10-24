import { getAllProperties, getPropertiesByOwnerId, getPropertyById } from './controller/getPropertyController';
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const ownerId = searchParams.get('ownerId');
    if (id) {
        const result = await getPropertyById(id);
        return result
    }
    if (ownerId) {
        const result = await getPropertiesByOwnerId(ownerId);
        return result
    }
    const result = await getAllProperties();
    return result
}
