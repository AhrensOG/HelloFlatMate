// validateData.js
export default function validateData(data) {
    console.log(data);

    // Verificar que las propiedades más importantes estén completas
    const requiredFields = ["name", "city", "street", "postalCode", "size", "roomsCount", "bathrooms", "bed", "maximunOccupants", "price", "category", "amenities", "description", "checkIn", "checkOut"];

    for (const field of requiredFields) {
        if (typeof data[field] === 'string') {
            if (data[field].trim() === '') {
                return { isValid: false, message: `El campo "${field}" está vacío.` };
            }
        } else if (data[field] === null || data[field] === undefined) {
            return { isValid: false, message: `El campo "${field}" no está definido.` };
        }
    }

    // Verificar que haya al menos una imagen cargada
    if (!data.images || data.images.length === 0) {
        return { isValid: false, message: "Debe subir al menos una imagen." };
    }

    // Verificar que haya al menos una habitación
    if (!data.roomsCount || data.roomsCount === 0) {
        return { isValid: false, message: "Debe añadir al menos una habitación." };
    }

    // Verificar que los datos de precios sean válidos si se requieren
    if (data.category !== "HELLO_ROOM" && data.category !== "HELLO_COLIVING") {
        if (isNaN(data.price) || data.price <= 0) {
            return { isValid: false, message: "El precio no es válido o está vacío." };
        }
        if (isNaN(data.amountOwner) || data.amountOwner <= 0) {
            return { isValid: false, message: "El monto para el propietario no es válido o está vacío." };
        }
        if (isNaN(data.amountHelloflatmate) || data.amountHelloflatmate <= 0) {
            return { isValid: false, message: "El monto para Helloflatmate no es válido o está vacío." };
        }
    }

    return { isValid: true, message: "Todos los campos están completos." };
}
