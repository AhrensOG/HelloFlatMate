import TitleAdminPanel from "../shared/TitleAdminPanel";
import { plus_jakarta } from "@/font";
import PropertyCard from "./PropertyCard";
import TableArticle from "../dashboard/TableArticle";
import Link from "next/link";

export default function PropertiesPanel({ data }) {
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col justify-center items-center p-2 gap-6`}
    >
      <TitleAdminPanel title={"Panel de propiedades"} />
      {/* {data?.map((item, index) => {
        item.link = `/pages/admin/lease_order/${item.id}`;
        item.update = `/pages/admin/update/${item.id}/${item.category}`;
        return <PropertyCard key={item?.id} data={item} />;
      })} */}
      {data.length <= 0 && (
        <Link
          href={"/pages/admin/create"}
          className="border border-resolution-blue px-5 py-2 max-w-[12rem] text-center w-full rounded-md bg-resolution-blue text-white font-medium"
        >
          Nueva Propiedad
        </Link>
      )}
      {data.length > 0 && <TableArticle data={data} />}
    </main>
  );
}
