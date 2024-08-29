import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination, AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import "@egjs/flicking-plugins/dist/pagination.css";

export default function SliderDetails({ children }) {
  const plugins = [
    new Pagination({ type: "bullet" }),
    new AutoPlay({
      duration: 2000,
      direction: "NEXT",
      stopOnHover: false,
      animationDuration: 3500,
    }),
  ];

  return (
    <Flicking plugins={plugins} circular={true}>
      {React.Children.map(children, (child) => (
        <div className="w-full">
          {React.cloneElement(child, { className: "w-full" })}
        </div>
      ))}
      <ViewportSlot>
        <div className="flicking-pagination"></div>
      </ViewportSlot>
    </Flicking>
  );
}
