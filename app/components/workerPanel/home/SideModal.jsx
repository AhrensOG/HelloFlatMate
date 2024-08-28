import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function SideModal({ children, action }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4 bg-white z-50 overflow-auto">
      <section className="flex items-center mb-2 w-full">
        <button
          onClick={action}
          type="button"
          className="w-6 h-6 opacity-70 ml-4"
        >
          <ArrowLeftIcon />
        </button>
      </section>
      {children}
      <section className="text-[#121417] flex flex-col gap-2">
        <p className="text-[0.65rem] text-[#919191] font-normal w-full text-center">
          lunes 1 de julio 2024 a las 09:12
        </p>
        <p className="text-base font-normal">
          Hay nuevos departamentos disponibles en la zona
        </p>
        <ul className="list-disc pl-7">
          <li>Avenida 123</li>
          <li>Calle 123</li>
        </ul>
      </section>
    </div>
  );
}
