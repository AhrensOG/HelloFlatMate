export default function AmenityTemplate({ name, onChange, checked }) {
  const handleChange = (e) => {
    onChange(name, e.target.checked);
  };

  return (
    <div className="flex justify-between items-center p-2 lg:w-[13rem]">
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        onChange={handleChange}
        checked={checked}
        className="appearance-none outline-none h-10 w-10 rounded-lg bg-no-repeat bg-center bg-contain shadow-amenity-check checked:bg-[url('/owner/check.svg')]"
        type="checkbox"
        id={name}
        name={name}
      />
    </div>
  );
}
