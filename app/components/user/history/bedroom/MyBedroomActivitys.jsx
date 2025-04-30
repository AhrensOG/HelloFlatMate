import { useRouter } from "next/navigation";
import ActivityItem from "./my_bedrooms_activity/ActivityItem";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function MyBedroomActivitys({ data }) {
    const t = useTranslations("user_panel.bedrooms_activity");
    const route = useRouter();
    return (
        <section className="w-full flex flex-col gap-4">
            <h2 className="text-[#000000CC] text-base font-bold">{t("title")}</h2>
            <div className="flex flex-wrap gap-5 items-center justify-around">
                {/* <ActivityItem
          title={"Mis contratos"}
          img={"/my_bedrooms/activitys/md-paper.svg"}
          action={() => {
            route.push("/pages/user/contract/history");
          }}
        /> */}
                <ActivityItem
                    title={t("my_finances")}
                    img={"/my_bedrooms/activitys/dollarsquare.svg"}
                    action={() => {
                        route.push("/pages/user/history/transactions");
                    }}
                />
                {/* <ActivityItem
          title={"Chat propietario"}
          img={"/my_bedrooms/activitys/chat.svg"}
          action={() => {
            route.push("/pages/user/chats");
          }}
        /> */}
                <ActivityItem
                    title={t("services")}
                    img={"/my_bedrooms/activitys/services.svg"}
                    action={() => {
                      route.push("/pages/user/services/" + data.id);
                    }}
                    // action={() => toast.info(t("toast_info"))}
                />
                <ActivityItem
                    title={t("supplies")}
                    img={"/my_bedrooms/activitys/flash.svg"}
                    // action={() => {
                    //   route.push("/pages/user/supplies/" + data.id);
                    // }}
                    action={() => toast.info(t("toast_info"))}
                />
                <ActivityItem
                    title={t("documents")}
                    img={"/my_bedrooms/activitys/document.svg"}
                    action={() => {
                        route.push("/pages/user/contract/history");
                    }}
                    // action={() => toast.info(t("toast_info"))}
                />
            </div>
        </section>
    );
}
