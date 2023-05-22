import React from "react";
import classes from "./ShowPage.module.css";
import { useParams } from "react-router";

export default function ShowPage() {
  const { id } = useParams();
  const componentValues = ["html", "css", "js"];

  var data = [];
  fetch(`/Buttons/${id}/index.html`)
    .then((res) => res.text())
    .then((text) => data.push(text));

  fetch(`/Buttons/${id}/style.css`)
    .then((res) => res.text())
    .then((text) => data.push(text));

  fetch(`/Buttons/${id}/app.js`)
    .then((res) => res.text())
    .then((text) => data.push(text));

  console.log(data);
  const components = componentValues.map((component, i) => {
    return (
      <div className={classes.text_field} key={i}>
        <textarea value={`${data}`} readOnly />
        <button onClick={(e) => navigator.clipboard.writeText(e.target.value)}>
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
          title={id}
          src={`../../Buttons/${id}/index.html?c=light_mode`}
        ></iframe>
      </div>
      <div className={classes.components_container}>{components}</div>
    </div>
  );
}
