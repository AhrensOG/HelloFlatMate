import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="w-full h-full relative">
      <div className="relative h-[40vh]">
        <Image
          src="/guest_home/banner/banner.png"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="banner-image"
        />
      </div>
      <div className="absolute inset-0 bg-banner-guest-home"></div>
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-transparent text-white font-bold z-50">
        <h1 className="text-[2.25rem] font-extrabold">HelloFlatmate</h1>
        <p className="pb-4 font-semibold text-sm">
          Simplificamos la forma de compartir tu hogar
        </p>
        <Link
          href={"/pages/auth"}
          className="max-w-[18.9rem] w-full h-[3rem] border rounded-lg text-center flex justify-between items-center mt-3 p-4 font-bold text-base"
        >
          Reservar ahora{" "}
          <span className="">
            <Image
              src="/guest_home/banner/rigth-arrow.svg"
              width={24}
              height={24}
              alt="ir a reservas"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
