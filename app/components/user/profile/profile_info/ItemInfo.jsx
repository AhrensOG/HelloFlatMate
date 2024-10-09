export default function ItemInfo({ title, body }) {
  return (
    <article className="flex flex-col gap-1 text-gray-700">
      <h3 className="font-semibold text-sm pl-2 text-gray-600">{title}</h3>
      <div className="bg-gray-100 h-[2.5rem] w-full rounded-md p-2 border border-gray-300 flex items-center">
        <p className="text-gray-800 text-sm truncate">{body}</p>
      </div>
    </article>
  );
}
