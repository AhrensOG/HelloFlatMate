import Image from "next/image";

export default function ProfilePicture({ image = "/profile/profile.jfif" }) {
  return (
    <article className="flex flex-col gap-2 items-center">
      <div className="relative h-40 w-40">
        <Image
          className="rounded-xl"
          src={image}
          fill
          alt="Ilustracion de perfil"
          objectPosition="top"
          style={{ objectFit: "cover" }}
        />
      </div>
    </article>
  );
}
