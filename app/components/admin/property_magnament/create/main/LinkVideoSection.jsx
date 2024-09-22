export default function LinkVideoSection({ data, setData }) {
  return (
    <section>
      <label className="font-bold text-[1.37rem]" htmlFor="linkVideo">
        Link Video
      </label>
      <input
        type="text"
        id="linkVideo"
        name="linkVideo"
        value={data || ""}
        placeholder="Enter link video"
        onChange={(event) => setData(event.target.value)}
        className="border rounded px-2 py-1 w-full appearance-none outline-none break-words"
      />
    </section>
  );
}
