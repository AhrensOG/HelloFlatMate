export default function ItemInfo({ title, body }) {
  return (
    <article className="flex flex-col gap-1 text-[#000000CC]">
      <h3 className="font-medium text-base pl-2">{title}</h3>
      <p className="shadow-item-profile h-[2.5rem] w-full rounded-lg p-2 border border-[#B2B2B2]">
        {body}
      </p>
    </article>
  );
}
