import DescriptionItem from "./description_section/DescriptionItem";

export default function DescriptionSection() {
    return (
        <section>
            <h2 className="font-bold text-[1.37rem]">Descripcion</h2>
            <ul className="list-disc p-3 pl-[1.6rem]">
                <DescriptionItem
                    body={
                        "2 Habitaciones dobles, con decoración sencilla y armoniosa."
                    }
                />
                <DescriptionItem
                    body={
                        "El tamaño es de unos 11 - 12 m2 aproximadamente. Cuentan con un armario para organizar todo tu equipaje."
                    }
                />
                <DescriptionItem
                    body={
                        "Queremos resaltar que la mayoría del mobiliario es totalmente nuevo a estrenar."
                    }
                />
            </ul>
        </section>
    );
}
