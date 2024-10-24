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
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";

export default function WorkerProfileInfo() {
  const route = useRouter();

  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(state?.user || null);

  useEffect(() => {
    setUser(state?.user);
  }, [state?.user]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <header className="w-full">
          <UserSerivceNavBar />
        </header>
        <main className="w-full grow grid place-items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </main>
      </div>
    );
  }

  return (
    <>
      <header>
        <UserSerivceNavBar />
      </header>
      <main
        className={`${plus_jakarta.className} flex flex-col items-center gap-5 w-full p-4`}
      >
        <section className="flex items-center mb-4 w-full">
          {/* <button
            onClick={() => {
              route.back();
            }}
            type="button"
            className="w-6 h-6 opacity-70 ml-4"
          >
            <ArrowLeftIcon />
          </button> */}
          <h2 className=" text-[#000000CC] font-bold text-xl lg:text-center lg:self-center w-full">
            Mi perfil
          </h2>
        </section>
        <div className=" lg:w-[30rem] flex flex-col gap-6">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="relative h-32 w-32 rounded-full bg-[#875252] overflow-hidden">
              <Image
                src={user?.profilePicture}
                fill
                alt="Profile image"
                className="object-cover object-top h-full w-full"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 h-12 rounded-b-full bg-[#91919199] backdrop-blur-md flex items-center justify-center">
                <CameraIcon className="h-7 w-7 text-white" />
              </div> */}
            </div>
            {/* 
            <p className="underline text-[#000000B2] font-semibold text-xs">
              Cambiar foto
            </p> */}
          </div>
          <ProfileItems
            title={"Nombre completo"}
            body={user?.name + " " + user?.lastName}
            icon={<PencilSquareIcon />}
          />
          {/* <ProfileItems
            title={"Genero"}
            body={ user.genre || "No definido"}
            icon={<ChevronDownIcon />}
          />
          <ProfileItems
            title={"Fecha de nacimiento"}
            body={formatDate(user?.birthDate) || "No definido"}
            icon={<CalendarDaysIcon />}
          /> */}
          <ProfileItems
            title={"Trabajo"}
            body={"Mantenimiento"}
            icon={<ChevronDownIcon />}
          />
          {/* <ProfileItems
            title={"Numero de contacto"}
            body={"+92-321-1234567"}
            icon={<PencilSquareIcon />}
          /> */}
        </div>
      </main>
    </>
  );
}
