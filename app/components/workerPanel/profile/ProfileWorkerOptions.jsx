import { useRouter } from "next/navigation";
import ProfileOption from "../../user/profile/profile_option/ProfileOption";

export default function ProfileWorkerOptions() {
  const route = useRouter();
  const handleRedirect = (url) => {
    route.push(url);
  };
  return (
    <section className="flex flex-col p-2 mt-1 rounded-3xl shadow-profile gap-3">
      <ProfileOption
        icon="/profile/profile_option/bx-home.svg"
        title="Historial de tareas"
        action={() => {
          handleRedirect("/pages/history/service/tasks");
        }}
      />
      <ProfileOption
        icon="/profile/profile_option/headphonesalt.svg"
        title="Hello soporte"
      />
      <ProfileOption
        icon="/profile/profile_option/card-checklist.svg"
        title="Terminos y condiciones"
        //   action={() => {
        //     handleRedirect("/pages/history/applications");
        //   }}
      />
    </section>
  );
}
