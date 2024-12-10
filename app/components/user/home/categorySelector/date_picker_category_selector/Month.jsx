import DaySel from "./DaySel";
export default function Month({ year, month, currentDay, callback, selectedDate }) {
    const generateDays = () => {
        const days = [];
        const lastOfCurrentMonth = new Date(year, month + 1, 0);

        for (let i = 1; i <= lastOfCurrentMonth.getDate(); i++) {
            const currentDate = new Date(year, month, i);

            // Permitir seleccionar la fecha actual y las futuras
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Eliminar la parte de tiempo para comparación
            const isPast = currentDate < today;

            days.push({
                day: i,
                isDisabled: isPast, // Disable only past dates
                date: currentDate,
            });
        }

        return days;
    };

    const renderDays = () => {
        const days = generateDays();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Eliminar la parte de tiempo para comparación

        return days.map((dayInfo, index) => {
            const isCurrentDay =
                !dayInfo.isDisabled &&
                dayInfo.date.getDate() === today.getDate() &&
                dayInfo.date.getMonth() === today.getMonth() &&
                dayInfo.date.getFullYear() === today.getFullYear();

            const isSelected = selectedDate && dayInfo.date.toDateString() === selectedDate.toDateString();

            return (
                <DaySel
                    key={index}
                    day={dayInfo.day}
                    isCurrentDay={isCurrentDay}
                    isSelected={isSelected}
                    callback={() => callback(dayInfo.date)}
                    isDisabled={dayInfo.isDisabled}
                />
            );
        });
    };

    return <div className="grid grid-cols-7 gap-x-4 gap-y-2 my-3 shadow-reservation-list cursor-pointer">{renderDays()}</div>;
}
