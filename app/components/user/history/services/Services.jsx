import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import ActionServiceCard from "./ActionServiceCard";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";

export default function Services({ id }) {
  const route = useRouter();
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(state.user);
  }, [state, dispatch]);

  const formatedDateAndHour = (date) => {
    const dateFormated = new Date(date);
    const day = dateFormated.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
    });
    const time = dateFormated.toLocaleTimeString("es-ES", {
      hour: "numeric",
      minute: "numeric",
    });
    return { day: day.charAt(0).toUpperCase() + day.slice(1), time: time };
  };

  const handleBack = () => {
    route.back();
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
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
          img={"/services/clean-stock-1.jpg"}
          position={"rigth"}
          action={() => {
            route.push("/pages/user/services/" + id + "/request/" + "CLEAN");
          }}
        />
        <ActionServiceCard
          title={"Servicio de mantenimiento"}
          body={
            "Asegura el óptimo funcionamiento y la longevidad de tus instalaciones con nuestro servicio de mantenimiento integral"
          }
          img={"/services/repair-stock.jpg"}
          action={() => {
            route.push("/pages/user/services/" + id + "/request/" + "REPAIR");
          }}
        />

        <h2 className="text-[#222222] font-semibold text-xl mt-6">
          Mis Servicios
        </h2>
        {!user ? (
          <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          user.toDos.map((toDo) => (
            <ActionServiceCard
              title={toDo.title}
              body={`El personal de limpieza irá a tu apartamento el día ${
                formatedDateAndHour(toDo.startDate).day
              }, a las ${formatedDateAndHour(toDo.startDate).time} hs.`}
              img={"/services/clean-stock-1.jpg"}
              position="rigth"
            />
          ))
        )}
      </motion.main>
    </AnimatePresence>
  );
}
