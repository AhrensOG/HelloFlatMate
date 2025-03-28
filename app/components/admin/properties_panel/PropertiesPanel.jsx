import TitleAdminPanel from "../shared/TitleAdminPanel";
import Link from "next/link";

export default function PropertiesPanel({ data , role }) {
  return (
    <main
      className={`  flex flex-col justify-center items-center p-2 gap-6`}
    >
      <TitleAdminPanel title={"Panel de propiedades"} />
      {data.properties?.length === 0 && role === "ADMIN"&& (
        <Link
        href={"/pages/admin/create"}
        className="border border-resolution-blue px-5 py-2 max-w-[12rem] text-center w-full rounded-md bg-resolution-blue text-white font-medium"
      >
        Nueva Propiedad
      </Link>
      )}
    </main>
  );
}
