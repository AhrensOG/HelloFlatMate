import GuestCard from "./guest_info/GuestCard";

export default function GuestInfo({ data }) {
  return (
    <section className="flex gap-3 justify-between w-full">
      {data.map((item) => {
        return (
          <GuestCard
            key={item.type}
            quantity={item.quantity}
            type={item.type}
          />
        );
      })}
    </section>
  );
}
