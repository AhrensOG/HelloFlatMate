export default function DescriptionSection({body}) {
  return (
    <article className="flex flex-col gap-2">
      <h3 className="font-semibold text-base text-black text-center">
        Descripcion
      </h3>
      <ul className="list-disc text-[#0D171C] text-base font-normal pl-3 lg:pl-10  lg:self-center">
        {/* <li>Reparar toma corriente del baño</li> */}
        <li> { body ? "El inquilino estara presente" : "El inquilino no estara presente" }</li>
      </ul>
    </article>
  );
}
