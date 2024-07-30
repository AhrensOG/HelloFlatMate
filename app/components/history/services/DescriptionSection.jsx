export default function DescriptionSection({ title, body }) {
  return (
    <section className="flex flex-col gap-7">
      <h2 className="font-bold text-xl">{title}</h2>
      <p className="text-base font-normal">{body}</p>
    </section>
  );
}
