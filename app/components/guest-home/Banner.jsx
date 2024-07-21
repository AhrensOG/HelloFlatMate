import Image from "next/image";

export default function Banner() {
  return (
    <section className="w-full h-[30vh] relative">
      <Image
        src="/guest_home/banner/banner.png"
        layout="fill"
        alt="banner-image"
      />
      <div className="absolute inset-0 bg-banner-guest-home"></div>
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-transparent text-white font-bold z-50">
        <h1 className="text-[2.25rem] font-extrabold">HelloFlatmate</h1>
        <p className="pb-4 font-semibold text-sm">
          Simplificamos la forma de compartir tu hogar
        </p>
        <button className="w-[18.9rem] h-[3rem] border rounded-lg text-center flex justify-between items-center mt-3 p-4 font-bold text-base">
          Reservar ahora{" "}
          <span className="">
            <Image
              src="/guest_home/banner/rigth-arrow.svg"
              width={24}
              height={24}
              alt="ir a reservas"
            />
          </span>
        </button>
      </div>
    </section>
  );
}
