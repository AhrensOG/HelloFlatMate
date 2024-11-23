import { useRouter } from "next/navigation";
import ActivityItem from "./my_bedrooms_activity/ActivityItem";
import { toast } from "sonner";

export default function MyBedroomActivitys({ data }) {
  const route = useRouter();
  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-[#000000CC] text-base font-bold">
        Actividades de mi alojamiento
      </h2>
      <div className="flex flex-wrap gap-5 items-center justify-around">
        {/* <ActivityItem
          title={"Mis contratos"}
          img={"/my_bedrooms/activitys/md-paper.svg"}
          action={() => {
            route.push("/pages/user/contract/history");
          }}
        /> */}
        <ActivityItem
          title={"Mis finanzas"}
          img={"/my_bedrooms/activitys/dollarsquare.svg"}
          action={() => {
            route.push("/pages/user/history/transactions");
          }}
        />
        {/* <ActivityItem
          title={"Chat propietario"}
          img={"/my_bedrooms/activitys/chat.svg"}
          action={() => {
            route.push("/pages/user/chats");
          }}
        /> */}
        <ActivityItem
          title={"Servicios"}
          img={"/my_bedrooms/activitys/services.svg"}
          // action={() => {
          //   route.push("/pages/user/services/" + data.id);
          // }}
          action={() =>
            toast.info("¡Estamos mejorando para ti! Pronto podrás gestionar todo desde un único lugar. Mientras tanto, recuerda que puedes acceder a tus facturas, contratos y suministros en la carpeta compartida de Google Drive.")
          }
        />
        <ActivityItem
          title={"Suministros"}
          img={"/my_bedrooms/activitys/flash.svg"}
          // action={() => {
          //   route.push("/pages/user/supplies/" + data.id);
          // }}
          action={() =>
            toast.info("¡Estamos mejorando para ti! Pronto podrás gestionar todo desde un único lugar. Mientras tanto, recuerda que puedes acceder a tus facturas, contratos y suministros en la carpeta compartida de Google Drive.")
          }
        />
        <ActivityItem
          title={"Documentos"}
          img={"/my_bedrooms/activitys/document.svg"}
          // action={() => {
          //   route.push("/pages/user/contract/history");
          // }}
          action={() =>
            toast.info("¡Estamos mejorando para ti!Pronto podrás gestionar todo desde un único lugar. Mientras tanto, recuerda que puedes acceder a tus facturas, contratos y suministros en la carpeta compartida de Google Drive.")
          }
        />
      </div>
    </section>
  );
}
