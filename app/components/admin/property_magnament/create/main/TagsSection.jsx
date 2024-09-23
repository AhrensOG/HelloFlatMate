export default function TagsSection({ data, setData }) {
  return (
    <section>
      <label className="font-bold text-[1.2rem]" htmlFor="tags">
        Etiquetas
      </label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={data || ""}
        placeholder="Ingrese las etiquetas"
        onChange={(event) => setData(event.target.value)}
        className="border rounded px-2 py-1 w-full appearance-none outline-none break-words"
      />
    </section>
  );
}
