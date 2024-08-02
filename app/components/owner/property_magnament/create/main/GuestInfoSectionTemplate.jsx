import GuestCardTemplate from "./guest_info/GuestCardTemplate";

export default function GuestInfoSectionTemplate({ data, setData }) {
  const { ocupants, beds, bathrooms } = data;

  const setOcupants = (newData) => {
    handleData({ ocupants: newData, beds, bathrooms });
  };
  const setBeds = (newData) => {
    handleData({ ocupants, beds: newData, bathrooms });
  };
  const setBathrooms = (newData) => {
    handleData({ ocupants, beds, bathrooms: newData });
  };

  const handleData = (newData) => {
    setData(newData);
  };
  return (
    <section className="flex gap-3 justify-between w-full">
      <GuestCardTemplate
        type={"Huespedes"}
        action={setOcupants}
        quantity={ocupants}
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
