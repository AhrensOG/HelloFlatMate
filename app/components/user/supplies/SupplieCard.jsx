import Image from "next/image";

export default function SupplieCard({ data, userName }) {
  const formatedDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  const setImage = (type) => {
    switch (type) {
      case "WATER":
        return "/supplies/whater.svg";
      case "GAS":
        return "/supplies/gas.svg";
      case "ELECTRICITY":
        return "/supplies/electricity.svg";
      case "INTERNET":
        return "/supplies/wifi.svg";
      case "EXPENSES":
        return "/supplies/tax.svg";
      default:
        return "/supplies/whater.svg";
    }
  };
  return (
    <article className="w-[19rem] h-[12rem] flex flex-col gap-3 shadow-supplie-card rounded-lg p-4">
      <div className="flex gap-2 items-center">
        <div className=" flex justify-center items-center w-11 h-11 rounded-lg shadow-supplie-card bg-[#ECF0F3]">
          <Image
            src={setImage(data?.type || "")}
            width={20}
            height={20}
            alt={data?.name || ""}
          />
        </div>
        <div className="flex flex-col gap-1 py-1">
          <h3 className="text-[#222B45] text-base font-normal ">
            {data?.name || ""}
          </h3>
          <p className="text-sm text-[#464E5F66] font-normal">
            {formatedDate(data?.date) || ""}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-sm text-[#464E5F66] font-normal">
        <p>{userName || ""}</p>
        <p>{data?.paymentDate || "Sin fecha"}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-[#4C5368] font-semibold text-base  border border-[#21ABCC] w-[3.7rem] h-9 rounded-2xl flex justify-center items-center">
          Є {data?.amount || ""}
        </span>
        {data?.status === "NOT_PAID" ? (
          <span className="bg-[#FF0000] text-white h-[2rem] w-[6.3rem] rounded-2xl font-medium text-base flex items-center justify-center">
            No pagado
          </span>
        ) : data?.status === "PAID" ? (
          <span className="bg-[#52B46B] text-white h-[2rem] w-[6.3rem] rounded-2xl font-medium text-base flex items-center justify-center">
            Aprobado
          </span>
        ) : data?.status === "PENDING" ? (
          <span className="bg-[#21ABCC] text-white h-[2rem] w-[6.3rem] rounded-2xl font-medium text-base flex items-center justify-center">
            En proceso
          </span>
        ) : null}
      </div>
    </article>
  );
}
