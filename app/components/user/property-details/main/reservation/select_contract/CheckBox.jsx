import React from "react";

export default function CheckBox({ name, body, callback, selectedValue }) {
  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    callback(value.replace("_", " ").replace("m", "M"));
  };

  const isSelected = selectedValue === name.replace("_", " ").replace("m", "M");

  return (
    <li
      className={`relative flex w-80 items-center justify-center gap-2.5 px-3 py-3.5 ${
        isSelected ? "bg-[#1C8CD61A]" : "bg-white"
      }`}
    >
      <input
        type="radio"
        name="checkbox-group"
        id={name}
        value={name}
        className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB5PSIwcHgiPjx0aXRsZT5pY29uX2J5X1Bvc2hseWFrb3YxMDwvdGl0bGU+PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+PGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgZmlsbD0iI2ZmZmZmZiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYuMDAwMDAwLCAyNi4wMDAwMDApIj48cGF0aCBkPSJNMTcuOTk5OTg3OCwzMi40IEwxMC45OTk5ODc4LDI1LjQgQzEwLjIyNjc4OTEyLDI0LjYyNjgwMTQgOC45NzMxODY0NCwyNC42MjY4MDE0IDguMTk5OTg3NzksMjUuNCBMOC4xOTk5ODc3OSwyNS40IEM3LjQyNjc4OTE0LDI2LjE3MzE5ODYgNy40MjY3ODkxNCwyNy40MjY4MDE0IDguMTk5OTg3NzksMjguMiBMMTYuNTg1Nzc0MiwzNi41ODU3ODY0IEMxNy4zNjY4MjI4LDM3LjM2NjgzNSAxOC42MzMxNTI4LDM3LjM2NjgzNSAxOS40MTQyMDE0LDM2LjU4NTc4NjQgTDQwLjU5OTk4NzgsMTUuNCBDNDEuMzczMTg2NCwxNC42MjY4MDE0IDQxLjM3MzE4NjQsMTMuMzczMTk4NiA0MC41OTk5ODc4LDEyLjYgTDQwLjU5OTk4NzgsMTIuNiBDMzkuODI2Nzg5MSwxMS44MjY4MDE0IDM4LjU3MzE4NjQsMTEuODI2ODAxNCAzNy43OTk5ODc4LDEyLjYgTDE3Ljk5OTk4NzgsMzIuNCBaIj48L3BhdGg+PC9nPjwvZz48L2c+PC9zdmc+')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-[#1C8CD6] focus:outline-none"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={name}
        className="w-full h-full cursor-pointer font-medium"
      >
        {body}
      </label>
    </li>
  );
}
