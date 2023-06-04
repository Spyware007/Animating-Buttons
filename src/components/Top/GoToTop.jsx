import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import "./GoToTop.css";
const GoToTop = () => {
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const [isVisible, setIsVisible] = useState(false);
  const listenToScroll = () => {
    let heightToHidden = 250;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <wrapper>
      {isVisible && (
        <div className="top-btn" onClick={goToBtn}>
          <FaArrowUp className="icon" />
        </div>
      )}
    </wrapper>
  );
};

export default GoToTop;
