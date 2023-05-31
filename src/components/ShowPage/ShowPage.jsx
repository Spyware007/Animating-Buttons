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
        <Editor displayName="HTML" value={html} onChange={(v) => setHtml(v)} />
        <Editor displayName="CSS" value={css} onChange={(v) => setCss(v)} />
        <Editor displayName="JS" value={js} onChange={(v) => setCss(v)} />
      </div>
    </div>
  );
}

export default App;
