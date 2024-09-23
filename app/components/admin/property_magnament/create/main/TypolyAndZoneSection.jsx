export default function TypolyAndZoneSection({ data, setData, category }) {
  return (
    <section>
      <div>
        {/* Input para la Zona */}
        <label className="font-bold text-[1.37rem]" htmlFor="zone">
          Zone
        </label>
        <input
          type="text"
          id="zone"
          name="zone"
          value={data.zone || ""}
          placeholder="Ingrese la zona"
          onChange={(event) => setData({ ...data, zone: event.target.value })}
          className="border rounded px-2 py-1 w-full appearance-none outline-none break-words"
        />
      </div>

      {(category === "HELLO_STUDIO" || category === "HELLO_LANDLORD") && (
        <div className="mt-4">
          {/* Select para la tipología */}
          <label className="font-bold text-[1.37rem]" htmlFor="typology">
            Typology
          </label>
          <select
            id="typology"
            name="typology"
            value={data.typology || "MIXED"}
            onChange={(event) =>
              setData({ ...data, typology: event.target.value })
            }
            className="border rounded px-2 py-1 w-full appearance-none outline-none"
          >
            <option value="MIXED">MIXED</option>
            <option value="ONLY_WOMEN">ONLY WOMEN</option>
            <option value="ONLY_MEN">ONLY MEN</option>
          </select>
        </div>
      )}
    </section>
  );
}
