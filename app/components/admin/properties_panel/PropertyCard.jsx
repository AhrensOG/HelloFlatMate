import { DocumentIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PropertyCard({ data }) {
  const isReserverd = () => {
    let aux;
    if (
      data.category === "HELLO_STUDIO" ||
      data.category === "HELLO_LANDLORD"
    ) {
      aux = data?.status === "RESERVED";
      return aux;
    }
    return data.rooms.filter((item) => item.status === "RESERVED").length > 0;
  };

  const verifiyStatus = (status) => {
    switch (status) {
      case "FREE":
        return (
          <button
            type="button"
            className="bg-[#52B46B] py-2 px-4 text-center rounded-2xl text-white text-sm font-medium"
          >
            Disponible
          </button>
        );
      case "RESERVED":
        return (
          <button
            type="button"
            className="bg-[#21ABCC] py-2 px-4 text-center rounded-2xl text-white text-sm font-medium"
          >
            Reservado
          </button>
        );
      case "OCCUPIED":
        return (
          <button
            type="button"
            className="bg-[#0E155F] py-2 px-4 text-center rounded-2xl text-white text-sm font-medium"
          >
            Alquilado
          </button>
        );
      default:
        return "";
    }
  };

  const router = useRouter();

  return (
    <article
      className={`w-[19rem] flex flex-col gap-6 shadow-supplie-card rounded-lg p-4 ${
        isReserverd() ? "border border-yellow-500" : ""
      }`}
    >
      <div className="flex gap-2 items-center">
        <div className=" flex justify-center items-center w-11 h-11 rounded-lg shadow-supplie-card bg-[#ECF0F3]">
          <Image
            src={"/admin/document-text.svg"}
            width={30}
            height={30}
            alt={"image"}
          />
        </div>
        <div className="flex flex-col gap-1 py-1">
          <h3 className="text-[#222B45] text-base font-medium ">
            {data?.name || ""}
          </h3>
        </div>
      </div>
      <div>
        {data.body ? (
          <p className="text-sm text-[#464E5F66] font-normal">{data.body}</p>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center">
          {verifiyStatus(data?.status || "")}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push(data.link)}
            className="h-9 w-9 border border-[#DDDFE1] text-[#0E155F] flex justify-center items-center"
          >
            <DocumentIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => router.push(data.update || "#")}
            className="h-9 w-9 border border-[#DDDFE1] text-[#0E155F] flex justify-center items-center"
          >
            <PencilIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </article>
  );
}
