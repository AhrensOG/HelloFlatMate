export default function FilterCheckBox({ name, onChange, isChecked }) {
  const handleChange = (e) => {
    // Convertir el nombre a minúsculas antes de pasarlo al manejador de cambios
    const normalizedCategoryName = name.toLowerCase();
    onChange(normalizedCategoryName, e.target.checked);
  };

  return (
    <div className="flex gap-3 justify-between w-full h-[5vh] items-center">
      <label
        className="text-base pb-[3px] font-normal"
        htmlFor={name.replace(" ", "_")}
      >
        {name}
      </label>
      <input
        onChange={handleChange}
        className="h-[1.1rem] w-[1.1rem] border-[2px]"
        type="checkbox"
        id={name.replace(" ", "_")}
        checked={isChecked}
      />
    </div>
  );
}
