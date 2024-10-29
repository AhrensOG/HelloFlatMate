export default function CalendarSection({ data, setData, category }) {
  return (
    <section>
      <div className="mt-4">
        {/* Select para la tipología */}
        <label className="font-bold text-[1.2rem]" htmlFor="calendar">
          Tipo de calendario
        </label>
        <select
          id="calendar"
          name="calendar"
          value={data || "SIMPLE"}
          onChange={(event) => setData(event.target.value)}
          className="border rounded px-2 py-1 w-full appearance-none outline-none"
        >
          <option value="SIMPLE">hello</option>
          <option value="FULL">personalizable</option>
        </select>
      </div>
    </section>
  );
}
