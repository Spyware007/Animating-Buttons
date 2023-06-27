import React, { useState, useRef, useEffect } from "react";
import classes from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import { useNavigate, useLocation } from "react-router-dom";

import LangButton from "../LangButton/LangButton";
import htmlIcon from "../../../assets/html.png";
import cssIcon from "../../../assets/css.png";
import jsIcon from "../../../assets/js.png";
import copyIcon from "../../../assets/copy.png";
// import { getAuth } from "firebase/auth";
import { auth, db } from "../../../firebase/auth"; // Import the db and signInWithGitHub from auth.js
import { collection, addDoc } from "firebase/firestore"; // Import the collection and addDoc functions
import axios from "axios";

export default function CodeEditor({ html, setHtml, css, setCss, js, setJs }) {
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation();

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
  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUserLoggedIn(true);
  //     } else {
  //       setUserLoggedIn(false);
  //       navigate("/login");
  //       const navigate = useNavigate();
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  const saveButtonToFirestore = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to add a button.");
      return;
    }

    const buttonCollectionRef = collection(db, "buttons");
    const buttonData = {
      html,
      css,
      js,
      likeCounter: 0,
      githubUsername: "",
      displayName: "",
      likedUsers: [],
    };

    try {
      const user = auth.currentUser;

      if (user) {
        const githubId = user.providerData.find(
          (provider) => provider.providerId === "github.com"
        ).uid;
        const response = await axios.get(
          `https://api.github.com/user/${githubId}`
        );
        console.log(response);
        const { login } = response.data;
        buttonData.githubUsername = login;

        const displayName = user.displayName || "";
        buttonData.displayName = displayName;
      }
      const docRef = await addDoc(buttonCollectionRef, buttonData);
      console.log("Button document saved with ID:", docRef.id);
      window.location.reload();
    } catch (error) {
      console.error("Error adding button document:", error);
    }
  };

  const getEditorValue = async () => {
    try {
      const editorValue = editorRef.current.getValue();
      await navigator.clipboard.writeText(editorValue);
      console.log("Value copied to clipboard:", editorValue);
    } catch (error) {
      console.error("Failed to copy value to clipboard:", error);
    }
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
        {location.pathname === "/add" && (
          <button className={classes.addbtn} onClick={saveButtonToFirestore}>
            CREATE
          </button>
        )}
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
}
