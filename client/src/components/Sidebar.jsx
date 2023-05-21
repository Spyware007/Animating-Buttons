import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarConstant } from "../constants/sidebar";

const Sidebar = ({ handleItemClick, activeItem,toggleDarkMode,isDarkMode }) => {
  const rootClassName = isDarkMode ? "dark-mode" : "light-mode";

  return (
    <div className={`hidden md:flex flex-col justify-around w-[20%] mt-16 border bg-white ${isDarkMode ? 'border-black' : 'border border-b-neutral-200'} fixed top-0 left-0 h-[95%] z-10 ${rootClassName} transition-all duration-500`}>
      <div className="px-6 -mt-7 flex flex-col gap-4">
        {sidebarConstant.map((element) => (
          <Link
            to={element.path}
            className={`flex items-center gap-2 py-4 px-2 rounded-lg pl-4 cursor-pointer ${
              activeItem === element.name ? isDarkMode ?  "bg-gray-700" : "bg-gray-100" : ""
            } ${isDarkMode ? "text-white" : "text-black"} ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition-all duration-500`}
            onClick={() => handleItemClick(element.name)}
          >
            <element.icon size={20} />
            <p>{element.name}</p>
          </Link>
        ))}
        <div className="flex items-center gap-1  rounded-lg py-4 px-2 mt-[-5px]">
        <div className="m-1 mt-[-17px] cursor-pointer">
        <input type="checkbox" id="darkmode-toggle" onClick={toggleDarkMode} />
        <label
          htmlFor="darkmode-toggle"
          className={`${
            isDarkMode ? "bg-black" : "bg-white"
          } transition-colors duration-200`}
        ></label></div>
        <div className="transition-all duration-5">
        {isDarkMode ? "Dark mode" : "Light mode"}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
