import React from "react";
import classes from "./Main.module.css";
import download from "../../Functions/Download";
// import open from "../../Functions/open";
import { Data } from "../../Data";

const Main = ({ modeToggle, modeToggleFunc }) => {
  const isDark = modeToggle ? "dark_mode" : "light_mode";
  return (
    <>
      <h1 className={classes.text}>Explore the Buttons by our Contributors.</h1>
      <div className={classes.btns_container}>
        {Data.map((d, i) => {
          return (
            <div key={i}>
              <iframe
                className={classes.container}
                title={d}
                src={`Buttons/${d}/index.html?c=${isDark}`}
              ></iframe>
              <div className={classes.download}>
                <p>Created by {d}</p>
                <button
                  type="submit"
                  onClick={() => download(d)}
                  // onClick={() => open(d)}
                  className={`${classes.mode_toggle} ${
                    modeToggle ? classes.dark_mode : classes.light_mode
                  }`}
                >
                  {/* See Code */}
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Main;
