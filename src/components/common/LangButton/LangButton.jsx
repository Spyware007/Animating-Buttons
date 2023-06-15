import React from "react";
import classes from "./LangButton.module.css";

const LangButton = ({ image, name, onClick }) => {
  return (
    <>
      <button onClick={onClick} className={classes.button}>
        <img className={classes.lang_image} src={image} alt="language image" />
        {name}
      </button>
    </>
  );
};

export default LangButton;
