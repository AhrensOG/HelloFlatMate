import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export default function SearchBar({ data, setData }) {
    const t = useTranslations("worker_panel.tasks.search_bar");
    return (
        <form action="">
            <label htmlFor="search"></label>
            <div className="flex items-center gap-1 bg-[#F0F2F5] rounded-xl p-1 lg:w-full">
                <span className="h-10 w-10 flex justify-center items-center text-[#637887]">
                    <MagnifyingGlassIcon className="w-6 h-6" />
                </span>
                <input
                    className="appearance-none outline-none bg-[#F0F2F5] w-full"
                    type="text"
                    placeholder={t("placeholder")}
                    id="search"
                    name="search"
                    onChange={(e) => setData(e.target.value)}
                />
            </div>
        </form>
    );
}
