import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PropertyInfo({ data }) {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/pages/user/property-details/${data.id}`);
  };
  return (
    <article
      onClick={handleRedirect}
      className="flex flex-col gap-2 min-w-[8.7rem] max-w-[10rem] items-center justify-between relative cursor-pointer"
    >
      <div className="relative h-24 rounded-xl w-full">
        <Image
          src={data.image}
          alt={data.name}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="rounded-xl"
        />
      </div>
      <h3 className="text-base font-medium break-words p-1">{data.name}</h3>
    </article>
  );
}
