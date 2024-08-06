import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import Image from "next/image";
import { plus_jakarta } from "@/font";
import PropertyCard from "./PropertyCard";

export default function PropertiesPanel() {
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col justify-center items-center p-2`}
    >
      <TitleAdminPanel title={"Propiedades"} />
      <PropertyCard
        name={"Villa eden"}
        image={"/admin/document-text.svg"}
        date={"Abril 9, 2024"}
        body={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
        }
        status={"avaible"}
      />
      <PropertyCard
        name={"Villa eden"}
        image={"/admin/document-text.svg"}
        date={"Abril 9, 2024"}
        body={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
        }
        status={"reserved"}
      />
      <PropertyCard
        name={"Villa eden"}
        image={"/admin/document-text.svg"}
        date={"Abril 9, 2024"}
        body={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
        }
        status={"rented"}
      />
    </main>
  );
}
