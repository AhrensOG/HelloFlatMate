"use client";
import { plus_jakarta } from "@/font";
import Image from "next/image";
import Filter from "../filter/Filter";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function SearchBarFiltered({ value }) {
  const [openFilters, setOpenFilters] = useState(false);
  const route = useRouter();

  const handleBack = () => {
    route.push(`/`);
  };
  return (
    <div className="w-full">
      <div
        className={`${plus_jakarta.className} text-[#A0A09F] w-full flex justify-center items-center`}
        role="search"
      >
        <div className="px-2 flex gap-2 items-center justify-center max-w-screen-sm w-full">
          <form className="flex align-center w-full h-[2.2rem] rounded-[0.6rem] border-[1px] border-[#00000033] gap-2">
            <button
              onClick={handleBack}
              type="button"
              className="self-center ml-2 h-6 w-6"
            >
              <ArrowLeftIcon />
            </button>
            <label htmlFor="search-input" className="text-center hidden">
              Buscar
            </label>
            <input
              className="rounded-[0.6rem] grow text-[0.93rem] font-medium outline-none text-left text-[#1C1C21] pl-3"
              type="text"
              placeholder="Buscar..."
              aria-label="Buscar"
              value={value}
            ></input>
          </form>

          <button
            className="flex font-medium text-base items-center gap-1 min-w-[59px]"
            aria-label="Abrir filtros"
            onClick={() => setOpenFilters(true)}
          >
            Filter
            <Image
              alt="Abrir filtros"
              src={"/search/filter-arrow.svg"}
              layout="responsive"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      <Filter isOpen={openFilters} setOpen={setOpenFilters} />
    </div>
  );
}
