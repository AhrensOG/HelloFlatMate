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
      <div className="absolute w-full h-full bottom-0 right-0 z-50 flex justify-end items-end">
        <h3 className="text-white font-extrabold text-4xl pb-5 text-center leading-none max-w-48">
          Nuestros Servicios
        </h3>
      </div>
    </article>
  );
}
