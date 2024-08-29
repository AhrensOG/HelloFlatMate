export default function PaymentInfo({ month, year, daysLeft }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-sm">
        {month} {year}
      </h3>
      <div className="flex gap-5">
        <span className="border-[#DE3737] border-[0.8px] bg-[#FF000033] rounded-md text-[#FF3C00] font-medium text-[0.5rem] px-1">
          No pagado Aun
        </span>
        <p className="text-xs font-light">
          Faltan {daysLeft} dias para el vencimiento
        </p>
      </div>
    </div>
  );
}
