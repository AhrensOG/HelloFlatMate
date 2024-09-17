import PropertyInfo from "./PropertyInfo";

export default function PropertySection({ data }) {

  return (
    <section className="flex flex-col gap-3 items-center w-full">
      <h2 className="font-bold text-[1.37rem] w-full text-start">Propiedad</h2>
      <div className="flex justify-evenly gap-1 w-full overflow-x-auto">
        <PropertyInfo data={data} />
      </div>
    </section>
  );
}
