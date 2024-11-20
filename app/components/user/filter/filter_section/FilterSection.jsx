import { useState, useEffect } from "react";
 
import FilterCheckBox from "./filter_option/FilterCheckBox";

export default function FilterSection({
  title,
  entries,
  onChange,
  initialValues,
}) {
  const [selected, setSelected] = useState(
    initialValues.map((item) => item.toLowerCase().replace("_", "")) || []
  );

  const handleCheckboxChange = (entry, isChecked) => {
    const updatedSelected = isChecked
      ? [...selected, entry]
      : selected.filter((item) => item !== entry);

    setSelected(updatedSelected);
    onChange(
      title !== "Comodidades" ? "categorys" : "comodities",
      updatedSelected
    );
  };

  return (
    <section
      className={`  flex flex-col gap-3 px-4 sm:px-0 text-[#1C1C21]`}
    >
      <h3 className="text-[1.37rem] font-bold">{title}</h3>
      {entries.map((entry) => (
        <FilterCheckBox
          key={entry}
          name={entry}
          onChange={handleCheckboxChange}
          isChecked={selected.includes(entry.toLowerCase().replace("_", ""))}
        />
      ))}
    </section>
  );
}
