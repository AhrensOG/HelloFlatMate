export default function AmenityTemplate({ name }) {
  return (
    <div className="flex justify-between items-center p-2">
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        className="appearance-none outline-none h-10 w-10 rounded-lg bg-no-repeat bg-center bg-contain shadow-amenity-check checked:bg-[url('/owner/check.svg')]"
        type="checkbox"
        id={name}
        name={name}
      />
    </div>
  );
}
