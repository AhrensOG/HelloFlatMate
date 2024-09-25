import createProperty from './controller/createPropertyController';
import { deleteProperty, desactivateProperty } from './controller/deletePropertyController';
import { getAllProperties, getAllPropertiesSimple, getPropertyById } from './controller/getPropertyController';
import { activateProperty, cascadeUpdateByCategory, updateProperty } from './controller/updateProperty';

// Manejar solicitud POST
export async function POST(req) {
    const data = await req.json();
    const result = await createProperty(data);

    return result
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const simple = searchParams.get('simple');
    if (id) {
        const result = await getPropertyById(id);
        return result
    }
    if (simple) {
        const result = await getAllPropertiesSimple();
        return result
    }
    const result = await getAllProperties();
    return result
}

export async function PUT(req) {
    const data = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const result = await updateProperty(id, data);
    return result
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    if (type === "del") {
        const result = await deleteProperty(id);
        return result
    }

    const result = await desactivateProperty(id);
    return result
}

export async function PATCH(req) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    if (type === "activate" && id) {
        const result = await activateProperty(id);
        return result
    }

    const data = await req.json();
    const result = await cascadeUpdateByCategory(data);
    return result
}