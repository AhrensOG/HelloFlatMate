import Image from "next/image";

export default function ActionServiceCard({
  action,
  title,
  body,
  img,
  position = "center",
}) {
  return (
    <section
      onClick={action}
      className="flex items-center shadow-card-action rounded-lg h-[7rem] w-[90vw] text-[#010F07]"
    >
      <div className="rounded-xl relative h-full w-[6rem]">
        <Image
          className="rounded-xl"
          src={img}
          alt="Imagen de referencia"
          fill
          style={{ objectFit: "cover", objectPosition: position }}
        />
      </div>
      <div className="flex flex-col items-start justify-evenly  h-full pl-2  pt-1 text-wrap w-[12.75rem]">
        <h2 className="font-bold text-[0.8rem]">{title}</h2>
        <p className="font-medium text-xs opacity-70">{body}</p>
      </div>
    </section>
  );
}
