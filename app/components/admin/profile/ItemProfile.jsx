export default function ItemProfile({ title, body }) {
  return (
    <article className="flex flex-col gap-2 text-[#000000CC] font-medium text-base">
      <h3 className="pl-2">{title}</h3>
      <p className="border border-[#B2B2B2] rounded-lg p-2 shadow-item-profile">
        {body}
      </p>
    </article>
  );
}
