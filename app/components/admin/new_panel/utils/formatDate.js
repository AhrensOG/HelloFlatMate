export default function formatDateToDDMMYYYY(isoString) {
  // 1. Validar que se haya recibido un valor
  if (!isoString) {
    return "Invalid date";
  }
  
  // 2. Intentar parsear la fecha
  const date = new Date(isoString);
  
  // 3. Verificar si es una fecha válida
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  
  // 4. Extraer día, mes y año
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses van de 0 a 11
  const year = date.getFullYear();
  
  // 5. Asegurar que día y mes tengan siempre dos dígitos
  const dayFormatted = day.toString().padStart(2, "0");
  const monthFormatted = month.toString().padStart(2, "0");
  
  // 6. Retornar la fecha en formato dd/mm/yyyy
  return `${dayFormatted}/${monthFormatted}/${year}`;
}