import React from "react";
import { buttonsList } from "./buttonsData";
import NavigationButton from "./NavigationButton";

const BottomNavBar = ({ section }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="p-2 pb-4 w-full h-full max-w-screen flex justify-around items-center border-t">
        {buttonsList.map((b) => {
          return (
            <NavigationButton
              key={b.title}
              img={b.img}
              alt={b.alt}
              title={b.title}
              link={b.link}
              gray={
                section === b.title.replace(" ", "_").toLowerCase()
                  ? false
                  : true
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
