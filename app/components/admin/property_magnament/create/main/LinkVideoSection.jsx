export default function LinkVideoSection({ data, setData }) {
  return (
    <section>
      <label className="font-bold text-[1.2rem]" htmlFor="linkVideo">
        Link Video
      </label>
      <input
        type="text"
        id="linkVideo"
        name="linkVideo"
        value={data || ""}
        placeholder="Link del video"
        onChange={(event) => setData(event.target.value)}
        className="border rounded p-2 w-full appearance-none outline-none break-words"
      />
    </section>
  );
}
