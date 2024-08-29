import TitleAdminPanel from "../shared/TitleAdminPanel";
import { plus_jakarta } from "@/font";
import PropertyCard from "./PropertyCard";

export default function PropertiesPanel({ data }) {
  console.log(data);
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col justify-center items-center p-2 gap-6`}
    >
      <TitleAdminPanel title={"Propiedades"} />

      {data?.map((item, index) => {
        item.link = `/pages/lease_order/${item.id}`;
        return <PropertyCard key={item?.id} data={item} />;
      })}
    </main>
  );
}
