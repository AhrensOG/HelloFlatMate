import { useRouter } from "next/navigation";
import ProfileOption from "./profile_option/ProfileOption";

export default function ProfileOptions() {
  const route = useRouter();
  const handleRedirect = (url) => {
    route.push(url);
  };
  return (
    <section className="flex flex-col p-2 mt-1 rounded-3xl shadow-profile gap-3">
      <ProfileOption
        icon="/profile/profile_option/bx-home.svg"
        title="Historial de renta"
        action={() => {
          handleRedirect("/pages/history/rent");
        }}
      />
      <ProfileOption
        icon="/profile/profile_option/bx-home-smile.svg"
        title="Solicitudes"
        action={() => {
          handleRedirect("/pages/history/applications");
        }}
      />
      <ProfileOption
        icon="/profile/profile_option/history-line.svg"
        title="Historial de Transacciones"
        action={() => {
          handleRedirect("/pages/history/transactions");
        }}
      />
      <ProfileOption
        icon="/profile/profile_option/headphonesalt.svg"
        title="Hello soporte"
      />
    </section>
  );
}
