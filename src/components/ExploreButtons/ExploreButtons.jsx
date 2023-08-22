import React from "react";
import classes from "./ExploreButtons.module.css";

const ExploreButtons = () => {
  return (
    <div className={classes.container}>
      <div class={classes.main}>
        {"More Buttons".split("").map((char, index) => (
          <span
            key={index}
            className={classes.animated}
            // style={{ "--i": index }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <div className={classes.main}>
        {"Coming Soon".split("").map((char, index) => (
          <span
            key={index}
            className={classes.animated}
            // style={{ "--i": index }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExploreButtons;
