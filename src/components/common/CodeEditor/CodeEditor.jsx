import React, { useState, useRef, useEffect } from "react";
import classes from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import LangButton from "../LangButton/LangButton";
import htmlIcon from "../../../assets/html.png";
import cssIcon from "../../../assets/css.png";
import jsIcon from "../../../assets/js.png";
import copyIcon from "../../../assets/copy.png";

const CodeEditor = ({ html, setHtml, css, setCss, js, setJs }) => {
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
  const [activeFile, setActiveFile] = useState("index.html");
  const [fileName, setFileName] = useState("index.html");
  const editorRef = useRef(null);
  const file = files[fileName];

  const getEditorValue = () => {
    const editorValue = editorRef.current.getValue();
    navigator.clipboard.writeText(editorValue);
  };

  const handleEditorChange = (fileName) => {
    setFileName(fileName);
    setActiveFile(fileName);
  };

  const handleEditorValueChange = (value) => {
    if (file.name === "index.html") {
      setHtml(value);
    } else if (file.name === "style.css") {
      setCss(value);
    } else if (file.name === "app.js") {
      setJs(value);
    }
  };

  return (
    <>
      <div className={classes.btns_container}>
        <LangButton
          name="HTML"
          image={htmlIcon}
          active={activeFile === "index.html"}
          onClick={() => handleEditorChange("index.html")}
        />
        <LangButton
          name="CSS"
          image={cssIcon}
          active={activeFile === "style.css"}
          onClick={() => handleEditorChange("style.css")}
        />
        <LangButton
          name="JS"
          image={jsIcon}
          active={activeFile === "app.js"}
          onClick={() => handleEditorChange("app.js")}
        />
        <LangButton name="COPY" image={copyIcon} onClick={getEditorValue} />
      </div>
      <div className={classes.editor}>
        <Editor
          className={classes.editor_component}
          theme="vs-dark"
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value || ""}
          onChange={handleEditorValueChange}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 16,
            automaticLayout: true,
            // Add any additional editor options here
          }}
          editorDidMount={(editor, _) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;
