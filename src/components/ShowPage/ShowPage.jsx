import React, { useState } from "react";
import classes from "./ShowPage.module.css";
import { useParams } from "react-router";

export default function ShowPage() {
  const d = useParams();
  console.log(d);
  const componentValues = ["html", "css", "js"];
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setjs] = useState("");

  const components = componentValues.map((v) => {
    return (
      <div className={classes.text_field}>
        <textarea
          className="text-field"
          value={`${v}`}
          onChange={(e) => setHtml(e.target.value)}
          placeholder={`Enter ${v}`}
        />

        <button
          className="copy-button"
          onClick={() => navigator.clipboard.writeText("text")}
        >
          Copy {v}
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
