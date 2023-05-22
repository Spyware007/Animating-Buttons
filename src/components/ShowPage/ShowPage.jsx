import React, { useState } from "react";
import classes from "./ShowPage.module.css";
import { useParams } from "react-router";

export default function ShowPage() {
  const { id } = useParams();
  const componentValues = ["html", "css", "js"];

  const [htmlCode, setHtmlCode] = useState();
  const [cssCode, setCssCode] = useState();
  const [jsCode, setJsCode] = useState();
  let codes = [htmlCode, cssCode, jsCode];

  fetch(`/Buttons/${id}/index.html`)
    .then((response) => response.text())
    .then((text) => setHtmlCode(text));

  fetch(`/Buttons/${id}/style.css`)
    .then((response) => response.text())
    .then((text) => setCssCode(text));

  fetch(`/Buttons/${id}/app.js`)
    .then((response) => response.text())
    .then((text) => setJsCode(text));

  const components = componentValues.map((component, i) => {
    return (
      <div className={classes.text_field} key={i}>
        <textarea value={`${codes[i]}`} readOnly />
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
