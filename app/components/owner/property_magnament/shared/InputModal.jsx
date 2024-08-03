import { useState, useEffect } from "react";

export default function InputModal({ value, placeholder, index, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <li className="font-normal text-base py-1">
      <label htmlFor={`input-${index}`} hidden>
        Input {index + 1}
      </label>
      <input
        onChange={handleValueChange}
        value={inputValue}
        placeholder={placeholder}
        type="text"
        name={`input-${index}`}
        id={`input-${index}`}
        className="border rounded px-2 py-1 w-full appariance-none outline-none break-words"
      />
    </li>
  );
}
