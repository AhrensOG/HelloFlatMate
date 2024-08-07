import Day from "./Day";

export default function Month({ year, month, date, callback, selectedDate }) {
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
      const isDisabled =
        year === date.getFullYear() &&
        month === date.getMonth() &&
        i < date.getDate();

      days.push({
        day: i,
        isDisabled: isDisabled,
        date: new Date(year, month, i),
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
