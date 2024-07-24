import Image from "next/image";

export default function ActionCard({ title, body, img }) {
  return (
    <section className="flex items-center justify-between shadow-card-action m-2 rounded-lg h-[6.87rem] w-[90%] text-[#010F07]">
      <div className="rounded-2xl relative h-[6.85rem] w-[6.85rem]">
        <Image
          className="rounded-2xl"
          src={img}
          alt="Imagen de referencia"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="flex flex-col items-start h-full pl-4 pt-2 grow">
        <h2 className=" font-bold text-base">{title}</h2>
        <p className="font-medium text-sm opacity-70">{body}</p>
      </div>
    </section>
  );
}
