import { poppins } from "@/font";
import Image from "next/image";

export default function TitleSection({ title, action }) {
  return (
    <div className="flex items-center gap-5">
      <button onClick={action} type="button" className="self-start m-5">
        <Image
          src={"/contract/back-icon.svg"}
          width={24}
          height={24}
          alt="Boton para regresar"
        />
      </button>
      <h1
        className={`${poppins.className} text-[#191B23] font-semibold text-xl`}
      >
        {title}
      </h1>
    </div>
  );
}
