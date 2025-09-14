import React, { useState, useRef, useEffect } from "react";
import classes from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import {
  useNavigate,
  useLocation,
  useParams,
  redirect,
} from "react-router-dom";

import LangButton from "../LangButton/LangButton";
import htmlIcon from "../../../assets/html.webp";
import cssIcon from "../../../assets/css.webp";
import jsIcon from "../../../assets/js.webp";
import copyIcon from "../../../assets/copy.webp";
// import { getAuth } from "firebase/auth";
import { auth, db } from "../../../firebase/auth"; // Import the db and signInWithGitHub from auth.js
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore"; // Import the collection and addDoc functions
import { toast, Toaster } from "react-hot-toast";

export default function CodeEditor({
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
  githubUsername,
}) {
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation();
  const naviagte = useNavigate();
  const { id } = useParams();

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
      status: "pending", // New buttons start as pending for admin review
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const user = auth.currentUser;
      // console.log(user.reloadUserInfo.providerUserInfo[0].screenName);
      buttonData.githubUsername =
        user.reloadUserInfo.providerUserInfo[0].screenName;
      const displayName = user.displayName || "";
      buttonData.displayName = displayName;
      const docRef = await addDoc(buttonCollectionRef, buttonData);
      console.log("Button document saved with ID:", docRef.id);
      toast.success(
        "Button submitted for review! It will appear on the site after admin approval."
      );
      setTimeout(() => {
        naviagte("/");
      }, 2000);
    } catch (error) {
      console.error("Error adding button document:", error);
      toast.error("Action Failed!");
    }
  };

  const updateButtonInFirestore = async (buttonId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to update a button.");
        return;
      }

      const buttonDocRef = doc(db, "buttons", buttonId);
      const buttonSnapshot = await getDoc(buttonDocRef);

      if (!buttonSnapshot.exists()) {
        console.log("Button document not found.");
        return;
      }
      const currentData = buttonSnapshot.data();

      const updatedData = {
        ...currentData,
        html,
        css,
        js,
      };

      await updateDoc(buttonDocRef, updatedData);

      console.log("Button document updated:", buttonId);
      return naviagte(`/user/${githubUsername}`);
    } catch (error) {
      console.error("Error updating button document:", error);
    }
  };

  const getEditorValue = async () => {
    try {
      const editorValue = editorRef.current.getValue();
      await navigator.clipboard.writeText(editorValue);
      console.log("Value copied to clipboard:", editorValue);
      toast.success("Value copied to clipboard");
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
        {((auth.currentUser &&
          location.pathname.split("/")[2] ===
            auth?.currentUser?.reloadUserInfo?.screenName) ||
          process.env.REACT_APP_admin_id.split(",").includes(
            auth?.currentUser?.reloadUserInfo?.screenName
          )) && (
          <button
            className={classes.addbtn}
            onClick={() =>
              toast.promise(updateButtonInFirestore(id), {
                loading: "Updating...",
                success: "Button Updated Successfully",
                error: "Updation Failed",
              })
            }
          >
            UPDATE
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
          onMount={(editor, _) => {
            editorRef.current = editor;
          }}
        />

        <Toaster />
      </div>
    </>
  );
}
