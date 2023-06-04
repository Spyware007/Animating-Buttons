import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/auth";
import Editor from "../Editor/Editor";
import classes from "./ShowPage.module.css";
import { useParams } from "react-router-dom";

function ShowPage() {
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
    const fetchCodeFromFirestore = async () => {
      try {
        const docRef = doc(db, "codes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const codeData = docSnap.data();
          setHtml(codeData.html);
          setCss(codeData.css);
          setJs(codeData.js);
        } else {
          console.log("No code found in Firestore for ID: ", id);
        }
      } catch (error) {
        console.error("Error fetching code from Firestore: ", error);
      }
    };

    fetchCodeFromFirestore();
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
        <Editor displayName="JS" value={js} onChange={(v) => setJs(v)} />
      </div>
    </div>
  );
}

export default ShowPage;
