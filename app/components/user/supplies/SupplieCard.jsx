"use client";

import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function SupplieCard({ data, user }) {
  console.log(data);
  console.log(user);
  const formatedDate = (date) => {
    if (!date) {
      return;
    }
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

  const handlePaySupply = async () => {
    const supplyId = data.id;
    const supplyName = data.name;
    const userEmail = user.email;
    const price = parseInt(data.amount * 100);
    try {
      const response = await fetch(
        "/api/stripe/create-supply-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplyId,
            supplyName,
            price,
            userEmail,
          }),
        }
      );
      const session = await response.json();

      const stripe = await stripePromise;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      toast.info("Seras redirigido a la pagina de pago");
    } catch (error) {
      console.log(error);
      return toast.error("Ocurrió un error con el pago");
    }
  };

  return (
    <article className="w-[19rem] flex flex-col gap-3 shadow-supplie-card rounded-lg p-4">
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
        <p>{user?.name + " " + user?.lastName || ""}</p>
        <p>Fecha limite: {formatedDate(data?.expirationDate) || "Sin fecha"}</p>
        <p>Fecha de pago: {formatedDate(data?.paymentDate) || "-"}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-[#4C5368] font-semibold text-base  border border-[#21ABCC] w-[3.7rem] h-9 rounded-2xl flex justify-center items-center">
          Є {data?.amount || ""}
        </span>
        {data?.status === "NOT_PAID" ? (
          <span className="bg-[#FF0000] text-white h-[2rem] px-4 min-w-[6.3rem] rounded-2xl font-medium text-base flex items-center justify-center">
            No pagado
          </span>
        ) : data?.status === "PAID" ? (
          <span className="bg-[#52B46B] text-white h-[2rem] px-4 min-w-[6.3rem] rounded-2xl font-medium text-base flex items-center justify-center">
            Aprobado
          </span>
        ) : data?.status === "PENDING" ? (
          <button
            onClick={() => {
              toast.promise(handlePaySupply(), {
                loading: "Procesando...",
                error: "Error al procesar pago",
              });
            }}
            className="bg-[#21ABCC] text-white h-[2rem] px-4 min-w-[6.3rem] rounded-2xl font-medium text-base flex items-center justify-center"
          >
            Realizar Pago
          </button>
        ) : null}
      </div>
    </article>
  );
}
