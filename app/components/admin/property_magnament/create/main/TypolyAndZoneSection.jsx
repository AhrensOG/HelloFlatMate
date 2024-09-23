export default function TypolyAndZoneSection({ data, setData, category }) {
  return (
    <section>
      <div>
        {/* Input para la Zona */}
        <label className="font-bold text-[1.37rem]" htmlFor="zone">
          Zona
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

      <div className="mt-4">
        {/* Select para la tipología */}
        <label className="font-bold text-[1.37rem]" htmlFor="typology">
          Tipología 
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
          <option value="MIXED">Mixto</option>
          <option value="ONLY_WOMEN">Solo mujeres</option>
          <option value="ONLY_MEN">Solo hombres</option>
        </select>
      </div>
    </section>
  );
}
