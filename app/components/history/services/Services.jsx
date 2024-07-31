import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import ActionServiceCard from "./ActionServiceCard";
import { useRouter } from "next/navigation";

export default function Services() {
  const route = useRouter();

  const handleBack = () => {
    route.back();
  };

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`${plus_jakarta.className} flex flex-col justify-center p-2 gap-8 items-center`}
      >
        <section className="flex w-full mt-7">
          <button
            onClick={handleBack}
            className="h-7 w-7 m-3 mr-4 flex justify-center items-center cursor-pointer opacity-70"
          >
            <ArrowLeftIcon className="h-7 w-7" />
          </button>
          <h1 className="font-semibold text-xl self-center  text-[#191B23]">
            Servicios
          </h1>
        </section>

        <ActionServiceCard
          title={"Servicio de limpieza"}
          body={
            "Mantén tu espacio impecable con nuestro servicio de limpieza profesional, diseñado para adaptarse a todas tus necesidades"
          }
          img={"/services/clean-stock-1.jfif"}
          position={"rigth"}
          action={() => {
            route.push("/pages/services/request");
          }}
        />
        <ActionServiceCard
          title={"Servicio de mantenimiento"}
          body={
            "Asegura el óptimo funcionamiento y la longevidad de tus instalaciones con nuestro servicio de mantenimiento integral"
          }
          img={"/services/repair-stock.jfif"}
          action={() => {
            route.push("/pages/services/request");
          }}
        />

        <h2 className="text-[#222222] font-semibold text-xl mt-6">
          Mis Servicios
        </h2>
        <ActionServiceCard
          title={"Servicio de limpieza"}
          body={
            "El personal de limpieza irá a tu apartamento el día sábado 6, a las 7:30 pm"
          }
          img={"/services/clean-stock-1.jfif"}
          position="rigth"
        />
      </motion.main>
    </AnimatePresence>
  );
}
