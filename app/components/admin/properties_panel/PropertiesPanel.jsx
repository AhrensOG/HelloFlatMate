import TitleAdminPanel from "../shared/TitleAdminPanel";
import { plus_jakarta } from "@/font";
import PropertyCard from "./PropertyCard";

export default function PropertiesPanel({ data }) {
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col justify-center items-center p-2 gap-6`}
    >
      <TitleAdminPanel title={"Propiedades"} />

      {data?.map((item, index) => {
        item.link = `/pages/admin/lease_order/${item.id}`;
        item.update = `/pages/admin/update/${item.id}/${item.category}`
        return <PropertyCard key={item?.id} data={item} />;
      })}
    </main>
  );
}
