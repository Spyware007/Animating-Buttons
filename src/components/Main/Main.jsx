import React from "react";
import classes from "./Main.module.css";
import { Link } from "react-router-dom";
import { Data } from "../../Data";
import download from "../../Functions/Download";

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
                <div className={classes.btn_container}>
                  <button
                    type="submit"
                    className={`${classes.mode_toggle} ${
                      modeToggle ? classes.dark_mode : classes.light_mode
                    }`}
                  >
                    <Link to={`/show/${d}`}>Show Code</Link>
                  </button>
                  <button
                    type="submit"
                    onClick={() => download(d)}
                    className={`${classes.mode_toggle} ${
                      modeToggle ? classes.dark_mode : classes.light_mode
                    }`}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Main;
