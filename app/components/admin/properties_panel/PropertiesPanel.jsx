import TitleAdminPanel from "../shared/TitleAdminPanel";
import { plus_jakarta } from "@/font";
import PropertyCard from "./PropertyCard";
import { useRouter } from "next/navigation";

export default function PropertiesPanel({ data }) {
  console.log(data);

  const router = useRouter();
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col justify-center items-center p-2 gap-6`}
    >
      <TitleAdminPanel title={"Propiedades"} />
      <button
        onClick={() => router.push("/pages/admin/create")}
        className="border border-resolution-blue px-5 py-2 max-w-[19rem] w-full rounded-md bg-resolution-blue text-white font-medium"
      >
        Nueva Propiedad
      </button>
      {data?.map((item, index) => {
        item.link = `/pages/admin/lease_order/${item.id}`;
        item.update = `/pages/admin/update/${item.id}/${item.category}`;
        return <PropertyCard key={item?.id} data={item} />;
      })}
    </main>
  );
}
