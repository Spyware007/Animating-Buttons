import React, { useState } from "react";
import MainNavBar from "../components/MainNavBar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ toggleDarkMode, isDarkMode }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <MainNavBar isDarkMode={isDarkMode} />
      </div>
      <div>
      <Sidebar activeItem={activeItem} handleItemClick={handleItemClick} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default MainLayout;
