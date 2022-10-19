import React from "react";
import classes from "./Main.module.css";
import download from "../../Functions/Download";
import { Data } from "../../Data";

const Main = () => {
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
                src={`Buttons/${d}/index.html`}
              ></iframe>
              <div className={classes.download}>
                <p>Created by {d}</p>
                <button
                  type="submit"
                  onClick={() => {
                    download(d);
                  }}
                  className={classes.btn}
                >
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
