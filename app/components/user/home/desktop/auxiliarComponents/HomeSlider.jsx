import { Arrow, AutoPlay, Fade, Perspective } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import "@egjs/flicking-plugins/dist/arrow.css";

const HomeSlider = ({ children }) => {
  const plugins = [
    new Perspective({ rotate: 0 }),
    // new Fade(),
    new Arrow({ disabledClass: true }),
    new AutoPlay({
      duration: 2000,
      direction: "NEXT",
      stopOnHover: true,
      animationDuration: 3500,
    }),
  ];

  return (
    <Flicking plugins={plugins} align="center" circular={true}>
      {children}
      <ViewportSlot>
        <span className="flicking-arrow-prev hidden sm:block custom-arrow-2 bg-black rounded-full"></span>
        <span className="flicking-arrow-next hidden sm:block custom-arrow-2 bg-black rounded-full"></span>
      </ViewportSlot>
    </Flicking>
  );
};

export default HomeSlider;
