import GuestCardRoom from "./GuestCardRoom";

export default function GuestInfoRoom({ data }) {

  return (
    <section className="flex gap-3 justify-evenly w-full">
      {data.map((item) => {
        return (
          <GuestCardRoom
            key={item.type}
            boolean={item.boolean}
            type={item.type}
            number={item.number}
          />
        );
      })}
    </section>
  );
}
