import { plus_jakarta } from "@/font";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import UserCard from "./UserCard";

export default function UsersPanel() {
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col gap-5 p-2 items-center`}
    >
      <TitleAdminPanel title={"Usuarios"} />
      <section className="w-full flex flex-col gap-4 justify-center items-center">
        <UserCard
          type={"super"}
          name={"David Wagner"}
          email={"david_wagner@gmail.com"}
        />
        <UserCard
          type={"user"}
          name={"Ina Hogan"}
          email={"ina_hogan@gmail.com"}
        />
        <UserCard
          type={"owner"}
          name={"David Hamon"}
          email={"david_hamon@gmail.com"}
        />
        <UserCard
          type={"superr"}
          name={"Lena Page"}
          email={"lena_page@gmail.com"}
        />
      </section>
    </main>
  );
}
