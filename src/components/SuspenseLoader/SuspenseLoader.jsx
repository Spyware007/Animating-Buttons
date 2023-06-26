import React from "react";
import classes from "./SuspenseLoader.module.css";
const SuspenseLoader = () => {
  return (
    <>
      <div className={classes["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default SuspenseLoader;
