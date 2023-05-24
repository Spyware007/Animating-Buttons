import React from "react";
import L1 from "../assets/l1.png";
import L2 from "../assets/l2.png";
import L3 from "../assets/l3.png";
import L4 from "../assets/l4.png";
import L5 from "../assets/l5.png";

const Wave = () => {
  return (
    <div className="custom-shape-divider-bottom-1681450176 ">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          className="shape-fill"
        ></path>
      </svg>
      <div className="flex items-center justify-center gap-6 bg-white pb-10">
        <img src={L1} className="h-14 w-14 object-contain" />
        <img src={L2} className="h-12 w-14 object-contain" />
        <img src={L3} className="h-12 w-14 object-contain" />
        <img src={L4} className="h-12 w-14 object-contain" />
        <img src={L5} className="h-12 w-14 object-contain" />
      </div>
    </div>
  );
};

export default Wave;
