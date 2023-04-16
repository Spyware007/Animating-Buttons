import React from "react";
import { Link } from "react-router-dom";
import { sidebarConstant } from "../constants/sidebar";

const Sidebar = ({ handleItemClick, activeItem }) => {
  return (
    <div className="hidden md:flex flex-col justify-around w-[20%] mt-16 border bg-white border-r-neutral-200 fixed top-0 left-0 h-[95%] z-10">
      <div className="px-6 -mt-7 flex flex-col gap-4">
        {sidebarConstant.map((element) => (
          <Link
            to={element.path}
            className={`flex items-center gap-2 py-4 px-2 rounded-lg pl-4 cursor-pointer hover:bg-gray-100 ${
              activeItem === element.name && "bg-gray-100"
            }`}
            onClick={() => handleItemClick(element.name)}
          >
            <element.icon size={20} />
            <p>{element.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
