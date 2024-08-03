import EditButton from "../../../shared/EditButton";

export default function GuestCardTemplate({ action, quantity, type }) {
  return (
    <article className="flex flex-col border border-[#D1DEE5] p-2 rounded-lg w-[7rem] h-[5.3rem] relative">
      <input
        onChange={(e) => action(e.target.value)}
        className="font-bold text-2xl appearance-none outline-none w-full"
        type="text"
        value={quantity || ""}
        name="quantity"
        id="quantity"
        placeholder="..."
      />
      <label className="text-sm text-[#4F7A94] font-normal" htmlFor={type}>
        {type}
      </label>
      <span className="absolute top-2 right-2">
        <EditButton />
      </span>
    </article>
  );
}
