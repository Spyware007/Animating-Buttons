import React, { useState, useEffect } from "react";
import classes from "./ShowCode.module.css";
import { useParams } from "react-router-dom";
import CodeEditor from "../CodeEditor/CodeEditor";

const ShowCode = () => {
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
      .then((text) => {
        if (text[0] === "<") text = " ";
        return text;
      })
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
        <CodeEditor
          html={html}
          setHtml={setHtml}
          css={css}
          setCss={setCss}
          js={js}
          setJs={setJs}
        />
      </div>
    </div>
  );
};

export default ShowCode;
