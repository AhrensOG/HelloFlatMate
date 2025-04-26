"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SliderDetails({
  children,
  rounded = "",
  interval = 6000,
}) {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const total = React.Children.count(children);

  // Autoplay
  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, interval);

    return () => clearInterval(autoplay);
  }, [total, interval]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${rounded}`}
      ref={containerRef}>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {React.cloneElement(child, { isActive: index === current })}
          </div>
        ))}
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full">
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-3 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full">
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
