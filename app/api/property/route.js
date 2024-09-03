
import { getAllProperties } from './controller/getPropertyController';
export async function GET(req) {
    const result = await getAllProperties();
    return result
}
