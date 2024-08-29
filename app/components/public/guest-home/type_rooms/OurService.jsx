import Image from "next/image";

export default function OurService() {
  return (
    <article className="h-[18.2rem] relative">
      <Image
        src="/guest_home/type_rooms/our-service.svg"
        alt="Nuestros Servicios"
        fill
        className="object-cover object-center"
      />
      <div className="absolute w-full h-full z-50 flex justify-start items-center">
        <h3 className="text-white font-extrabold text-4xl pb-5 text-center leading-none max-w-48">
          Nuestros Servicios
        </h3>
      </div>
    </article>
  );
}
