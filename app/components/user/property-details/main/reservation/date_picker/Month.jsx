import Day from "./Day";

export default function Month({
  year,
  month,
  date,
  callback,
  selectedDate,
  isDateOccupied,
  rentalPeriods, // Pasamos rentalPeriods al componente
  startDate,
  endDate,
}) {
  // Obtener el rango de fechas válidas de rentalPeriods
  const rentalDateRanges = rentalPeriods.map((period) => ({
    start: new Date(period.rentalPeriod?.startDate),
    end: new Date(period.rentalPeriod?.endDate),
  }));

  // Función para verificar si una fecha está dentro del rango de rentalPeriods
  const isDateInRentalRange = (currentDate) => {
    return rentalDateRanges.some((range) => {
      // Cambiar el operador de comparación a <= para incluir el end date
      return currentDate >= range.start && currentDate <= range.end;
    });
  };

  // Calcula el último día del mes anterior, el último día del mes actual y el primer día del mes siguiente
  const lastOfPrevMonth = new Date(year, month, 0);
  const lastOfCurrentMonth = new Date(year, month + 1, 0);
  const firstOfNextMonth = new Date(year, month + 1, 1);

  // Función para seleccionar una fecha
  const selectDate = (day) => {
    let selectedDate = new Date(year, month, day);
    callback(selectedDate);
  };

  // Genera los días del calendario
  const generateDays = () => {
    const days = [];

    // Días del mes anterior
    const lastDayOfPrevMonth = lastOfPrevMonth.getDate();
    const startDayOfPrevMonth = lastDayOfPrevMonth - lastOfPrevMonth.getDay();
    for (let i = startDayOfPrevMonth; i <= lastDayOfPrevMonth; i++) {
      days.push({
        day: i,
        isDisabled: true,
        date: new Date(year, month - 1, i),
      });
    }

    // Días del mes actual
    for (let i = 1; i <= lastOfCurrentMonth.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      const isDisabled =
        year === date.getFullYear() &&
        month === date.getMonth() &&
        i < date.getDate();

      // Verificar si la fecha está ocupada o fuera del rango de rentalPeriods
      const isOccupied = isDateOccupied(currentDate);
      const isOutsideRentalRange = !isDateInRentalRange(currentDate);

      days.push({
        day: i,
        isDisabled: isDisabled || isOccupied || isOutsideRentalRange,
        date: currentDate,
      });
    }

    // Días del mes siguiente
    const endDayOfNextMonth =
      firstOfNextMonth.getDate() + (7 - firstOfNextMonth.getDay());
    for (let i = 1; i < endDayOfNextMonth; i++) {
      days.push({
        day: i,
        isDisabled: true,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  // Renderiza los días
  const renderDays = () => {
    const days = generateDays();
    const today = new Date(); // Obtiene la fecha de hoy

    return days.map((dayInfo, index) => {
      const isCurrentDay =
        !dayInfo.isDisabled &&
        dayInfo.date.getDate() === today.getDate() &&
        dayInfo.date.getMonth() === today.getMonth() &&
        dayInfo.date.getFullYear() === today.getFullYear();

      // Verificar si el día es el startDate o el endDate
      const isStartDate =
        startDate && dayInfo.date.toDateString() === startDate.toDateString();

      const isEndDate =
        endDate && dayInfo.date.toDateString() === endDate.toDateString();

      return (
        <Day
          key={index}
          day={dayInfo.day}
          isCurrentDay={isCurrentDay}
          isSelected={
            !dayInfo.isDisabled &&
            selectedDate &&
            dayInfo.date.toLocaleDateString("es-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }) === selectedDate
          }
          isStartDate={isStartDate}
          isEndDate={isEndDate}
          callback={selectDate}
          isDisabled={dayInfo.isDisabled}
        />
      );
    });
  };

  return (
    <div className="grid grid-cols-7 gap-x-4 gap-y-2 my-3 shadow-reservation-list">
      {renderDays()}
    </div>
  );
}
