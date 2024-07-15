import { plus_jakarta } from "@/font";
import FilterCheckBox from "./filter_option/FilterCheckBox";

export default function FilterSection({ title, entries }) {
    console.log(entries);
    return (
        <section className={`${plus_jakarta.className} flex flex-col gap-3 px-4 text-[#1C1C21]`}>
            <h3 className="text-[1.37rem] font-bold">{title}</h3>
            {entries.map(entry => <FilterCheckBox name={entry} />)}
        </section>
    )
}