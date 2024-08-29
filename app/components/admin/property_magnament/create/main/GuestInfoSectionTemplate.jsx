import GuestCardTemplate from "./guest_info/GuestCardTemplate";

export default function GuestInfoSectionTemplate({ data, setData }) {
  const { occupants, beds, bathrooms } = data;

  const setOcupants = (newData) => {
    handleData({ occupants: newData, beds, bathrooms });
  };
  const setBeds = (newData) => {
    handleData({ occupants, beds: newData, bathrooms });
  };
  const setBathrooms = (newData) => {
    handleData({ occupants, beds, bathrooms: newData });
  };

  const handleData = (newData) => {
    setData(newData);
  };
  return (
    <section className="flex gap-3 justify-between w-full">
      <GuestCardTemplate
        type={"Huespedes"}
        action={setOcupants}
        quantity={occupants}
      />
      <GuestCardTemplate
        type={"Báños"}
        action={setBathrooms}
        quantity={bathrooms}
      />
      <GuestCardTemplate type={"Camas"} action={setBeds} quantity={beds} />
    </section>
  );
}
