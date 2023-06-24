import React from "react";
import classes from "./ViewsIcon.module.css";
import views from "./views.png";

const ViewsIcon = ({ viewsCounter = 200 }) => {
  return (
    <>
      <div className={classes.views}>
        <img className={classes.views_gif} src={views} alt="" />
        <h1 className={classes.views_counter}>{viewsCounter}</h1>
      </div>
    </>
  );
};

export default ViewsIcon;
