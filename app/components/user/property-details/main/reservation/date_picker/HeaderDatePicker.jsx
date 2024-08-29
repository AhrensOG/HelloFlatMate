import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function HeaderDatePicker({ year, month, date, day, callback }) {
  const nextBtn = () => {
    if (month.month === 11) {
      month.setMonth(0);
      console.log(month.month, year.year);
      year.setYear(year.year + 1);
      console.log(month.month, year.year);
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

  const changeYear = (e) => {
    const { value } = e.target;
    year.setYear(parseInt(value, 10));
  };
  const changeMonth = (e) => {
    const { value } = e.target;
    month.setMonth(parseInt(value, 10));
  };

  return (
    <header className="flex justify-between gap-2 items-center pb-3 border-b border-white">
      <button
        onClick={prevBtn}
        className="text-[#B5BEC6] hover:text-[#0C1660] h-7 w-7"
        type="button"
      >
        <ChevronLeftIcon />
      </button>
      <div className="flex gap-1 m-auto">
        <select
          name="month"
          id="month"
          value={month.month}
          onChange={changeMonth}
          className="text-sm text-center appearance-none  outline-none border-none w-13"
        >
          <option value={0}>Enero</option>
          <option value={1}>Febrero</option>
          <option value={2}>Marzo</option>
          <option value={3}>Abril</option>
          <option value={4}>Mayo</option>
          <option value={5}>Junio</option>
          <option value={6}>Julio</option>
          <option value={7}>Agosto</option>
          <option value={8}>Septiembre</option>
          <option value={9}>Octubre</option>
          <option value={10}>Noviembre</option>
          <option value={11}>Diciembre</option>
        </select>
        <input
          type="text"
          name="year"
          id="year"
          value={year.year}
          readOnly
          disabled
          className="text-sm border border-white w-10"
        />
      </div>
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
