import { MinusIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RequestPayment({ next, back }) {
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [title, setTitle] = useState("");
  const [typeSupply, setTypeSupply] = useState("");

  const formatDate = (event) => {
    let input = event.target.value.replace(/\D/g, "");
    if (input.length > 2 && input.length < 5) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    } else if (input.length > 4) {
      input =
        input.slice(0, 2) + "/" + input.slice(2, 4) + "/" + input.slice(4, 8);
    }
    event.target.value = input;
    setDate(input);
  };

  const cleanDate = () => {
    return setDate("");
  };

  useEffect(() => {
    setAmount(amount);
    setDiscount(discount);
    setReference(reference);
    setTitle(title);
    setTypeSupply(typeSupply);
  }, [amount, discount, reference, title, typeSupply]);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-x-0 bottom-0 flex flex-col justify-center items-center w-full min-h-[30rem] z-50 bg-[#e1eff2ff] rounded-t-3xl"
    >
      <section className="w-full flex flex-col gap-2 items-center text-black p-4">
        <div className="mb-4 w-full flex justify-center items-center">
          <button onClick={back} className="h-4">
            <Image
              src={"/admin/grabber.svg"}
              alt="grabber"
              width={40}
              height={30}
            />
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-base pl-3" htmlFor="title">
            Título de la Factura
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="appearance-none outline-none border border-[#DDDDDD] bg-white rounded-xl p-2 w-full"
            type="text"
            name="title"
            id="title"
            placeholder="Ej. Factura de Agua"
            value={title}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-base pl-3" htmlFor="typeSupply">
            Tipo de Suministro
          </label>
          <select
            onChange={(e) => setTypeSupply(e.target.value)}
            className="appearance-none outline-none border border-[#DDDDDD] bg-white rounded-xl p-2 w-full"
            name="typeSupply"
            id="typeSupply"
            value={typeSupply}
          >
            <option value="" disabled>
              Selecciona un tipo de suministro
            </option>
            <option value="WATER">Agua</option>
            <option value="GAS">Gas</option>
            <option value="ELECTRICITY">Electricidad</option>
            <option value="EXPENSES">Gastos</option>
            <option value="INTERNET">Internet</option>
            <option value="OTHERS">Otros</option>
          </select>
        </div>
        <form
          className="w-full justify-center items-center gap-6 flex flex-col"
          action=""
        >
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-base pl-3" htmlFor="date">
              Fecha
            </label>
            <div className="flex gap-2 border border-[#DDDDDD] bg-white rounded-xl p-2">
              <span>
                <CalendarDaysIcon className="flex justify-center items-center h-5 w-5 text-[#AAAAAA]" />
              </span>
              <input
                onChange={formatDate}
                className="appearance-none outline-none w-full"
                type="text"
                name="date"
                id="date"
                placeholder="dd/mm/aaaa"
                value={date}
              />
              <button
                onClick={cleanDate}
                className="cursor-pointer flex justify-center items-center text-[#AAAAAA]"
                type="button"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 flex-col items-center w-full text-start">
            <label
              className="font-medium text-base w-full text-start pl-3"
              htmlFor="reference"
            >
              Referencia (Opcional)
            </label>
            <input
              onChange={(e) => setReference(e.target.value)}
              className="appearance-none outline-none border border-[#DDDDDD] bg-white rounded-xl p-2 w-full"
              type="text"
              name="reference"
              id="reference"
            />
          </div>
          <div className="flex gap-2 flex-col items-center w-full text-start">
            <label
              className="font-medium text-base w-full text-start pl-3"
              htmlFor="discount"
            >
              Descuentos
            </label>
            <textarea
              onChange={(e) => setDiscount(e.target.value)}
              className="appearance-none outline-none border border-[#DDDDDD] bg-white rounded-xl p-2 w-full"
              name="discount"
              id="discount"
            ></textarea>
          </div>
          <div className="flex gap-2 flex-col items-center w-full text-start">
            <label
              className="font-medium text-base w-full text-start pl-3"
              htmlFor="total"
            >
              Total
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              className="appearance-none outline-none border border-[#DDDDDD] bg-white rounded-xl p-2 w-full"
              type="text"
              name="total"
              id="total"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                next({
                  title,
                  typeSupply,
                  date,
                  reference,
                  discount,
                  amount,
                });
              }}
              className="p-2 px-12 rounded-2xl text-white bg-[#0E155F]"
              type="button"
            >
              Generar
            </button>
          </div>
        </form>
      </section>
    </motion.aside>
  );
}
