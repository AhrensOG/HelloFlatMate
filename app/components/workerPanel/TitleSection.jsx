import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function TitleSection({ title }) {
  const route = useRouter();
  return (
    <section className="flex justify-center items-center mb-4 w-full">
      {/* <button
        onClick={() => {
          route.back();
        }}
        type="button"
        className="w-6 h-6 opacity-70 ml-4"
      >
        <ArrowLeftIcon />
      </button> */}
      <h2 className=" text-[#000000CC] font-bold text-xl mx-auto">{title}</h2>
    </section>
  );
}
