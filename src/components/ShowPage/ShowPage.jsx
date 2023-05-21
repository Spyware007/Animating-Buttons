import React from "react";
import classes from "./ShowPage.module.css";
import { useParams } from "react-router";

export default function ShowPage() {
  const d = useParams();
  const componentValues = ["html", "css", "js"];

  const components = componentValues.map((component, i) => {
    return (
      <div className={classes.text_field} key={i}>
        <textarea value={`$This is a {component} Text Field`} readOnly />
        <button onClick={() => navigator.clipboard.writeText("text")}>
          Copy {component}
        </button>
      </div>
    );
  });

  return (
    <div className={classes.editor_container}>
      <div className={classes.iframe_container}>
        <iframe
          className={classes.container}
          title={d.id}
          src={`../../Buttons/${d.id}/index.html?c=light_mode`}
        ></iframe>
      </div>
      <div className={classes.components_container}>{components}</div>
    </div>
  );
}
