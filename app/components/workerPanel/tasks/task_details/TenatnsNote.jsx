export default function TenatnsNote({ body }) {
  return (
    <article className="flex flex-col gap-2 mx-2">
      <h3 className="font-semibold text-base text-black text-center">
        Nota del inquilino
      </h3>
      <p className="text-[#0D171C] text-base font-normal w-80 bg-[#D9D9D9] rounded-lg p-2 break-words lg:self-center">
        {body}
      </p>
    </article>
  );
}
