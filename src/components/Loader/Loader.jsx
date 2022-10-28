import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={classes.laoder_container}>
        <div className={classes.loading}>
          <span className={classes.span}></span>
          <span className={classes.span}></span>
          <span className={classes.span}></span>
          <span className={classes.span}></span>
          <span className={classes.span}></span>
        </div>
      </div>
    </>
  );
};

export default Loader;
