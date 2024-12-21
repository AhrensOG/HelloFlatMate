import { useState } from "react";
import MoreInfoItem from "./more_info_section/MoreInfoItem";
import { useTranslations } from "next-intl";

export default function MoreInfoSection({ data }) {
    const t = useTranslations("room_details.more_info");
    const [activeIndex, setActiveIndex] = useState(null); // Estado para manejar el item activo

    const handleSetActive = (index) => {
        // Si el mismo item se selecciona, se cierra; de lo contrario, se abre uno nuevo
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section>
            <h2 className="font-bold text-[1.37rem]">{t("title")}</h2>
            {data.map((item, index) => (
                <MoreInfoItem
                    key={index}
                    title={item.title}
                    body={item.body}
                    isOpen={activeIndex === index} // Verifica si este item está abierto
                    action={() => handleSetActive(index)} // Pasa el index del item
                />
            ))}
        </section>
    );
}
