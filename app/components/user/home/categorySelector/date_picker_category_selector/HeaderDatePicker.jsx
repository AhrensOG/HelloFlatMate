import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function HeaderDatePicker({ year, month }) {
  const nextBtn = () => {
    if (month.month === 11) {
      month.setMonth(0);
      year.setYear(year.year + 1);
    } else {
      month.setMonth(month.month + 1);
    }
  };

  const prevBtn = () => {
    if (month.month === 0) {
      month.setMonth(11);
      year.setYear(year.year - 1);
    } else {
      month.setMonth(month.month - 1);
    }
  };

  // Formato de mes y año
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const formattedDate = `${monthNames[month.month]} ${year.year}`;

  return (
    <header className="flex justify-between gap-2 items-center pb-3 border-b border-white">
      <button
        onClick={prevBtn}
        className="text-[#B5BEC6] hover:text-[#0C1660] h-7 w-7"
        type="button"
      >
        <ChevronLeftIcon />
      </button>
      <div className="text-center text-sm">{formattedDate}</div>
      <button
        onClick={nextBtn}
        className="text-[#B5BEC6] hover:text-[#0C1660] h-7 w-7"
        type="button"
      >
        <ChevronRightIcon />
      </button>
    </header>
  );
}
