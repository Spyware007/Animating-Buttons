import React from "react";
import classes from "./DeleteButton.module.css";

const DeleteButton = ({ modeToggle, handleDelete }) => {
  return (
    <div
      onClick={handleDelete}
      className={`${classes.deleteButton} ${
        modeToggle ? classes["dark"] : classes["light"]
      }`}
    >
      <div className={classes.heartBg}>
        <div className={`${classes.heartIcon} `}></div>
      </div>
    </div>
  );
};

export default DeleteButton;
