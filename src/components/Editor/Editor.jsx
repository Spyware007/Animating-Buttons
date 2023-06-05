import React from "react";
import classes from "./Editor.module.css";

export default function Editor(props) {
  const { displayName, value } = props;

  return (
    <div className={classes.text_field}>
      <div>{displayName}</div>
      <textarea
        onChange={(event) => props.onChange(event.target.value)}
        value={value}
      />
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(value)}
      >
        Copy {displayName}
      </button>
    </div>
  );
}
