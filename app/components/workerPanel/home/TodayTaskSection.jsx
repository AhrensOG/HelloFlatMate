import { useRouter } from "next/navigation";
import TaskCardSimple from "./TaskCardSimple";
import { AnimatePresence, motion } from "framer-motion";
import BottomNavBar from "../bottomNavBar/BottomNavBar";
import UserSerivceNavBar from "../nav_bar/UserServiceNavBar";
import { useTranslations } from "next-intl";

export default function TodayTaskSection({ data, section }) {
    const route = useRouter();
    const handleShowdetails = (id) => {
        route.push("/pages/worker-panel/tasks/details?id=" + id);
    };

    const t = useTranslations("worker_panel.tasks");

    return (
        <section className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl text-[#121417]">{t("my_tasks")}</h2>
            {data?.length > 0 ? (
                data?.map((item) => (
                    <TaskCardSimple
                        action={() => handleShowdetails(item?.id)}
                        type={item?.type?.toLowerCase()}
                        status={item?.status?.toLowerCase()}
                        title={item?.title}
                    />
                ))
            ) : (
                <div className="flex justify-center items-center">
                    <p className="text-[#121417]">{t("no_tasks")}</p>
                </div>
            )}
        </section>
    );
}
