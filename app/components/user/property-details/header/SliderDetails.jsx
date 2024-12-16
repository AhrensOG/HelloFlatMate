import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination, AutoPlay, Arrow } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SliderDetails({ children, rounded = "" }) {
  const plugins = [
    // new Pagination({ type: "bullet" }),
    new Arrow({ disabledClass: true }),
    new AutoPlay({
      duration: 2000,
      direction: "NEXT",
      stopOnHover: false,
      animationDuration: 3500,
    }),
  ];

  return (
    <Flicking plugins={plugins} circular={true} className={`${rounded}`}>
      {React.Children.map(children, (child) => (
        <div className="w-full rounded-2xl">
          {React.cloneElement(child, { className: "w-full" })}
        </div>
      ))}
      {/* <ViewportSlot>
        <div className="flicking-pagination"></div>
      </ViewportSlot> */}
      <ViewportSlot>
        <span
          className="flicking-arrow-prev"
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <ChevronLeftIcon className="size-4" />
        </span>
        <span
          className="flicking-arrow-next"
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <ChevronRightIcon className="size-4" />
        </span>
      </ViewportSlot>
    </Flicking>
  );
}
