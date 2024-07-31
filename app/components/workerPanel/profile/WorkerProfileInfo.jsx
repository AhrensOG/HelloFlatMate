import Image from "next/image";
import UserSerivceNavBar from "../nav_bar/UserServiceNavBar";
import TitleSection from "../TitleSection";
import {
  CalendarDaysIcon,
  CameraIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { plus_jakarta } from "@/font";
import ProfileItems from "./ProfileItems";
import { useRouter } from "next/navigation";

export default function WorkerProfileInfo() {
  const route = useRouter();

  return (
    <>
      <header>
        <UserSerivceNavBar />
      </header>
      <main
        className={`${plus_jakarta.className} flex flex-col items-center m-10 gap-5`}
      >
        <section className="flex items-center mb-4 w-full">
          <button
            onClick={() => {
              route.back();
            }}
            type="button"
            className="w-6 h-6 opacity-70 ml-4"
          >
            <ArrowLeftIcon />
          </button>
          <h2 className=" text-[#000000CC] font-bold text-xl ml-20">Perfil</h2>
        </section>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="relative h-32 w-32 rounded-full bg-[#875252] overflow-hidden">
            <Image
              src={"/profile/service/service-profile.png"}
              fill
              alt="Profile image"
              className="object-cover object-top h-full w-full"
            />
            <div className="absolute bottom-0 left-0 right-0 h-12 rounded-b-full bg-[#91919199] backdrop-blur-md flex items-center justify-center">
              <CameraIcon className="h-7 w-7 text-white" />
            </div>
          </div>

          <p className="underline text-[#000000B2] font-semibold text-xs">
            Cambiar foto
          </p>
        </div>
        <ProfileItems
          title={"Nombre completo"}
          body={"Jose Sanchez"}
          icon={<PencilSquareIcon />}
        />
        <ProfileItems
          title={"Genero"}
          body={"Masculino"}
          icon={<ChevronDownIcon />}
        />
        <ProfileItems
          title={"Fecha de nacimiento"}
          body={"20-09-1996"}
          icon={<CalendarDaysIcon />}
        />
        <ProfileItems
          title={"Trabajo"}
          body={"Mantenimiento"}
          icon={<ChevronDownIcon />}
        />
        <ProfileItems
          title={"Numero de contacto"}
          body={"+92-321-1234567"}
          icon={<PencilSquareIcon />}
        />
      </main>
    </>
  );
}
