import { inter } from "@/font";
import DetailItem from "./details_contract/DetailItem";

export default function DetailsContract({
  nameRoom,
  totalPay,
  dateStart,
  dateEnd,
  totalMonths,
  lastPay,
}) {
  return (
    <section className="flex flex-col gap-3 mx-5">
      <h2 className={`${inter.className} font-medium text-base`}>
        Detalles del contrato
      </h2>
      <article className="flex flex-col gap-2">
        <h3 className={`${inter.className} font-medium text-base`}>
          {nameRoom}
        </h3>
        <article className="flex flex-col gap-2">
          <DetailItem title={"Dia de incio"} body={dateStart} />
          <DetailItem title={"Dia de finalizacion"} body={dateEnd} />
          <DetailItem title={"Total pagado"} body={totalPay} />
          <DetailItem
            title={"Duracion de la renta"}
            body={`${totalMonths} meses`}
          />
          <DetailItem title={"Ultimo pago"} body={lastPay} />
        </article>
      </article>
    </section>
  );
}
