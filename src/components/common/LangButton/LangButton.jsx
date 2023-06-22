import React from "react";
import classes from "./LangButton.module.css";

const LangButton = ({ image, name, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={active ? classes.active_button : classes.button}
    >
      <img className={classes.lang_image} src={image} alt="language _mage" />
      {name}
    </button>
  );
};

export default LangButton;
