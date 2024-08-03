// validateData.js
export default function validateData(data) {
    // Asegúrate de que cada campo en el objeto data esté definido y no esté vacío
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            if (value.trim() === '') {
                return { isValid: false, message: `El campo "${key}" está vacío.` };
            }
        } else if (value === null || value === undefined) {
            return { isValid: false, message: `El campo "${key}" no está definido.` };
        }
    }
    return { isValid: true, message: 'Todos los campos están completos.' };
}
