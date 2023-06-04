import React, { useState, useEffect } from "react";
import Editor from "../Editor/Editor";
import classes from "./ShowPage.module.css";
import { useParams } from "react-router-dom";

function App() {
  const { id } = useParams();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [selectedOption, setSelectedOption] = useState("HTML");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    fetch(`/Buttons/${id}/index.html`)
      .then((response) => response.text())
      .then((text) => setHtml(text));

    fetch(`/Buttons/${id}/style.css`)
      .then((response) => response.text())
      .then((text) => setCss(text));

    fetch(`/Buttons/${id}/app.js`)
      .then((response) => response.text())
      .then((text) => setJs(text));
  }, [id]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={classes.editor_container}>
      
      <div className={classes.iframe_container}>
        <iframe
          className={classes.container}
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
        />
      </div>
      <div className={classes.components_container}>
      <div className={classes.navbar}>
        <button
          className={`${classes.navbar_option} ${
            selectedOption === "HTML" ? classes.active : ""
          }`}
          onClick={() => handleOptionChange("HTML")}
        >
          HTML
        </button>
        <button
          className={`${classes.navbar_option} ${
            selectedOption === "CSS" ? classes.active : ""
          }`}
          onClick={() => handleOptionChange("CSS")}
        >
          CSS
        </button>
        <button
          className={`${classes.navbar_option} ${
            selectedOption === "JS" ? classes.active : ""
          }`}
          onClick={() => handleOptionChange("JS")}
        >
          JS
        </button>
      </div>
      
      <div className={classes.codes}>
        {selectedOption === "HTML" && (
          <Editor displayName="HTML" value={html} onChange={(v) => setHtml(v)} />
        )}
        {selectedOption === "CSS" && (
          <Editor displayName="CSS" value={css} onChange={(v) => setCss(v)} />
        )}
        {selectedOption === "JS" && (
          <Editor displayName="JS" value={js} onChange={(v) => setJs(v)} />
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
