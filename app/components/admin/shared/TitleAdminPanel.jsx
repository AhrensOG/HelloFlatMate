import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function TitleAdminPanel({ title, action }) {
    const route = useRouter();
    return (
        <div className="relative flex items-center justify-center w-full mt-2 z-10">
            <button onClick={action ? action : () => route.back()} type="button" className="h-7 w-7 opacity-70 absolute left-0">
                <ArrowLeftIcon />
            </button>
            <h1 className="font-semibold text-xl text-[#191B23]">{title}</h1>
        </div>
    );
}
