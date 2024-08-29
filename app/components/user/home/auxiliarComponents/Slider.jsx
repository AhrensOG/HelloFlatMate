import { Arrow, AutoPlay } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import "@egjs/flicking-plugins/dist/arrow.css";

const Slider = ({ children }) => {
  const plugins = [
    new Arrow({ disabledClass: true }),
    new AutoPlay({
      duration: 2000,
      direction: "NEXT",
      stopOnHover: false,
      animationDuration: 3500,
    }),
  ];

  return (
    <Flicking plugins={plugins} align="prev" circular={true}>
      {children}
      <ViewportSlot>
        <span className="flicking-arrow-prev is-thin hidden sm:block "></span>
        <span className="flicking-arrow-next is-thin hidden sm:block "></span>
      </ViewportSlot>
    </Flicking>
  );
};

export default Slider;
