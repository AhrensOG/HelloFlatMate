import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ItemInfoAdmin from "./ItemInfoAdmin";
import { plus_jakarta } from "@/font";
import TitleAdminPanel from "../shared/TitleAdminPanel";
export default function AdminProfile() {
  const [showPencil, setShowPencil] = useState(false);

  const handleShowPencil = () => {
    setShowPencil(!showPencil);
  };

  return (
    <>
      <main
        className={`${plus_jakarta.className} flex flex-col gap-5 p-2 items-center`}
      >
        <TitleAdminPanel title="Configuracion" />
        <section className="p-2 w-full flex flex-col gap-4">
          <h2 className="font-medium text-[#000000CC] text-base">
            Tu informacion de perfil
          </h2>
          <article className="flex justify-center">
            <div
              onMouseEnter={handleShowPencil}
              onMouseLeave={handleShowPencil}
              className="relative h-36 w-36 rounded-full"
            >
              <div>
                <Image
                  className="rounded-full"
                  src={"/profile/profile.jfif"}
                  fill
                  alt="Ilustracion de perfil"
                  objectPosition="top"
                  style={{ objectFit: "cover" }}
                />
              </div>
              {showPencil && (
                <button
                  className="absolute inset-0 z-50 text-white w-full h-full flex justify-center items-center"
                  type="button"
                >
                  <PencilSquareIcon className=" h-8 w-8" />
                </button>
              )}
            </div>
          </article>
        </section>
        <section className="flex flex-col gap-5 p-2 w-full">
          <h2 className="text-bold text-lg">Nombre completo</h2>
          <ItemInfoAdmin title={"Nombre"} body={"Usuario"} />
          <ItemInfoAdmin title={"Apellido"} body={"helloflatmate"} />
        </section>
        <section className="flex flex-col gap-5 p-2 w-full">
          <h2 className="text-bold text-lg">Correo de contacto</h2>
          <ItemInfoAdmin title={"Email"} body={"usuario@gmail.com"} />
        </section>
      </main>
    </>
  );
}
