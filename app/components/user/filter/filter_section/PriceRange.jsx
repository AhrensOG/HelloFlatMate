import React, { useContext, useState } from "react";
import "./range-price.css";
 
import { Context } from "@/app/context/GlobalContext";

export default function PriceRange({ onChange, initialValue }) {
  const { state, dispatch } = useContext(Context);

  // Asegurar que los valores iniciales no sean negativos
  const [minValue, setMinValue] = useState(
    initialValue?.minPrice >= 0 ? initialValue.minPrice : 0
  );
  const [maxValue, setMaxValue] = useState(
    initialValue?.maxPrice >= 0 ? initialValue.maxPrice : 2000
  );
  const priceGap = 1;

  const handleMinChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) value = 0; // No permitir valores negativos
    if (value > maxValue - priceGap) {
      value = maxValue - priceGap;
    }
    setMinValue(value);
    onChange("minPrice", value);
  };

  const handleMaxChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) value = 0; // No permitir valores negativos
    if (value < minValue + priceGap) {
      value = minValue + priceGap;
    }
    setMaxValue(value);
    onChange("maxPrice", value);
  };

  return (
    <div className={`  p-4`}>
      <h3 className="text-base mb-3 font-medium text-[#1C1C21]">
        Rango de Precio
      </h3>
      <div className="h-full flex justify-between mb-2">
        <input
          type="number"
          min="0" // Evitar que se ingrese un valor menor a 0
          max="10000" // Máximo valor permitido
          value={minValue}
          onChange={handleMinChange}
          className="w-full max-w-16 px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <input
          type="number"
          min="0" // Evitar que se ingrese un valor menor a 0
          max="10000" // Máximo valor permitido
          value={maxValue}
          onChange={handleMaxChange}
          className="w-full max-w-16 px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="w-[98%] h-1.5 rounded-md bg-[#D6D6DE] relative">
        <div
          className="h-1.5 rounded-md bg-[#0E1863] absolute left-0 right-0 top-0 bottom-0 z-[100]"
          style={{
            left: `${(minValue / 2000) * 100}%`,
            right: `${100 - (maxValue / 2000) * 100}%`,
          }}
        ></div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={2000}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-full top-[10px] pointer-events-auto appearance-none"
          style={{ zIndex: 10 }}
          alt="Modificar precio minimo"
        />
        <input
          type="range"
          min={0}
          max={2000}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-full top-0 pointer-events-auto appearance-none"
          style={{ zIndex: 10 }}
          alt="Modificar precio maximo"
        />
      </div>
    </div>
  );
}
