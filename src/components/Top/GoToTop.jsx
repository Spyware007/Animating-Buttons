import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import classes from "./GoToTop.module.css";
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
    <div className={classes.wrapper}>
      {isVisible && (
        <div className={`${classes["top-btn"]} ${isVisible ? classes.reveal : ""}`} onClick={goToBtn}>
          <FaArrowUp className={classes.icon} />
        </div>
      )}
    </div>
  );
};

export default GoToTop;



