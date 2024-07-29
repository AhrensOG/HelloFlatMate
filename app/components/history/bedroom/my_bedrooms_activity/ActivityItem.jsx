import Image from "next/image";

export default function ActivityItem({ title, img }) {
  return (
    <article className="flex flex-col gap-2 text-[#000000B2] font-medium text-sm h-[6rem] w-[6rem] rounded-xl shadow-activity-item items-center justify-center">
      <div className="relative h-9 w-9">
        <Image
          src={img}
          fill
          alt="Ilustracion de actividad"
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>
      <p className="text-wrap text-center">{title}</p>
    </article>
  );
}
