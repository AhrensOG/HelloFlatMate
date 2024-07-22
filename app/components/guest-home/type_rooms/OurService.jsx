import Image from "next/image";

export default function OurService() {
  return (
    <article className="h-[18.2rem] relative">
      <Image
        src="/guest_home/type_rooms/our-service.jfif"
        alt="Nuestros Servicios"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div className="absolute bottom-0 right-0 px-3 pb-5 z-50 flex justify-end items-end">
        <h3 className="text-white font-bold text-[2.5rem] text-center h-[30%] w-[50%] leading-none">
          Nuestros Servicios
        </h3>
      </div>
    </article>
  );
}
