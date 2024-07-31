import React from "react";
import NavBar from "../nav_bar/NavBar";
import BottomNavBar from "./bottomNavBar/BottomNavBar";

const BaseWorkerPanelTemplate = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex-grow">{children}</main>
      <footer>
        <BottomNavBar />
      </footer>
    </div>
  );
};

export default BaseWorkerPanelTemplate;
