import { inter } from "@/font";
import PaymentButton from "./pext_payment_details/PaymentButton";
import PaymentDetails from "./pext_payment_details/PaymentDetails";
import PaymentInfo from "./pext_payment_details/PaymentInfo";

export default function NextPaymentDetails({
  month,
  year,
  daysLeft,
  price,
  dueDate,
}) {
  return (
    <section className="flex flex-col mx-5 gap-4">
      <h2 className={`${inter.className} font-medium text-base`}>
        Proximo Pago
      </h2>
      <article className="flex flex-col border border-[#B2B2B2] rounded-lg p-4 gap-3">
        <PaymentInfo month={month} year={year} daysLeft={daysLeft} />
        <div className="flex flex-col gap-2">
          <PaymentDetails title="Cantidad a pagar" body={price} />
          <PaymentDetails title="Fecha de vencimiento" body={dueDate} />

          <PaymentButton />
        </div>
      </article>
    </section>
  );
}
