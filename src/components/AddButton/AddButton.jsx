import { useState, useEffect } from "react";
import classes from "./AddButton.module.css";
import CodeEditor from "../common/CodeEditor/CodeEditor";
import { htmlTemplate, cssTemplate, jsTemplate } from "./templates";

const AddButton = () => {
  const [html, setHtml] = useState(htmlTemplate);
  const [css, setCss] = useState(cssTemplate);
  const [js, setJs] = useState(jsTemplate);
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

export default AddButton;
