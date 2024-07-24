import RoomInfo from "./room_section/RoomInfo";

export default function RoomSection() {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="font-bold text-[1.37rem]">Habitaciones</h2>
            <div className="flex gap-3">
                <RoomInfo
                    title="Habitacion 1"
                    info="1 cama"
                    image="/property_details/room/stock-1.svg"
                />
                <RoomInfo
                    title="Habitacion 2"
                    info="1 cama"
                    image="/property_details/room/stock-2.svg"
                />
            </div>
        </section>
    );
}
