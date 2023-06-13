import { useState, useRef, useEffect } from "react";
import classes from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import LangButton from "../LangButton/LangButton";
import htmlIcon from "../../assets/html.png";
import cssIcon from "../../assets/css.png";
import jsIcon from "../../assets/js.png";
import copyIcon from "../../assets/copy.png";

const CodeEditor = ({ html, css, js, setHtml, setCss, setJs }) => {
  const files = {
    "index.html": {
      name: "index.html",
      language: "html",
      value: html,
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: css,
    },
    "app.js": {
      name: "app.js",
      language: "javascript",
      value: js,
    },
  };
  const [fileName, setFileName] = useState("index.html"); // change to "index.html"
  const editorRef = useRef(null);
  const file = files[fileName];

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const getEditorValue = () => {
    // alert(editorRef.current.getValue());
    navigator.clipboard.writeText(editorRef.current.getValue());
  };

  return (
    <>
      <div className={classes.btns_container}>
        <LangButton
          name="HTML"
          image={htmlIcon}
          onClick={() => setFileName("index.html")}
        />
        <LangButton
          name="CSS"
          image={cssIcon}
          onClick={() => setFileName("style.css")}
        />
        <LangButton
          name="JS"
          image={jsIcon}
          onClick={() => setFileName("app.js")}
        />
        <LangButton
          name="COPY"
          image={copyIcon}
          onClick={() => getEditorValue()}
        />
      </div>
      <div className={classes.editor}>
        <Editor
          className={classes.editor_component}
          height="100%"
          width="100%"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          onChange={(value) => {
            // files[fileName].value = value;
            if (file.name == "index.html") setHtml(value);
            else if (file.name == "style.css") setCss(value);
            else if (file.name == "app.js") setJs(value);
            else console.log("error");
          }}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 20,
            automaticLayout: true,
            // Add any additional editor options here
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;
