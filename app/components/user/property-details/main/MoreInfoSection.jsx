import { useState } from "react";
import MoreInfoItem from "./more_info_section/MoreInfoItem";
import rentalCondition from "./more_info_section/texts";

export default function MoreInfoSection({ data }) {
  const [info, setInfo] = useState("");
  const handleSetInfo = (info) => {
    setInfo(info);
  };
  return (
    <section>
      <h2 className="font-bold text-[1.37rem]">Más sobre este lugar</h2>
      {data.map((item, index) => (
        <MoreInfoItem
          key={index}
          title={item.title}
          body={item.body}
          action={handleSetInfo}
        />
      ))}
    </section>
  );
}
