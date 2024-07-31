import { useRouter } from "next/navigation";
import TaskCardSimple from "./TaskCardSimple";

export default function TodayTaskSection() {
  const route = useRouter();
  const handleShowdetails = () => {
    route.push("/pages/worker-panel/tasks/details");
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl text-[#121417]">Hoy</h2>
      <TaskCardSimple
        action={handleShowdetails}
        type={"repair"}
        status={"pending"}
        title={"Cambiar lamparas en departamento 1"}
      />
      <TaskCardSimple
        action={handleShowdetails}
        type={"repair"}
        status={"in_process"}
        title={"Revisar toma corrientes depto 2"}
      />
      <TaskCardSimple
        action={handleShowdetails}
        type={"repair"}
        status={"completed"}
        title={"Instalacion de nuevo toma corrientes departemento 3"}
      />
    </section>
  );
}
