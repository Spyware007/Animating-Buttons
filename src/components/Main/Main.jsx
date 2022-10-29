import React from "react";
import classes from "./Main.module.css";
import download from "../../Functions/Download";
import { Data } from "../../Data";

const Main = ({ modeToggle, modeToggleFunc }) =>  {
  const isDark = modeToggle ? "dark_mode" : "light_mode";
  return (
    <>
      <h1 className={classes.text}>Explore the Buttons by our Contributors.</h1>
      <div className={classes.btns_container}>
      <iframe
          className={classes.container}
          title="Vaishnavi2701_mk"
          src="Buttons/Vaishnavi2701_mk/index.html"
      ></iframe>
       <iframe
          className={classes.container}
          title="Vaishnavi2701_mk_1"
          src="Buttons/Vaishnavi2701_mk_1/index.html"
      ></iframe>
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
                  onClick={() => {
                    download(d);
                  }}
                  className={`${classes.mode_toggle} ${modeToggle ? classes.dark_mode : classes.light_mode}`} >
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
