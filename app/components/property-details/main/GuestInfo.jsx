import GuestCard from "./guest_info/GuestCard";

export default function GuestInfo() {
    return (
        <section className="flex gap-3 justify-between w-full">
            <GuestCard quantity="4" type="Huespedes" />
            <GuestCard quantity="2" type="Baños" />
            <GuestCard quantity="2" type="Bañeras" />
        </section>
    );
}
