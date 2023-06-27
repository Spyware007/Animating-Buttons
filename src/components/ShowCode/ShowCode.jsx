import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CodeEditor from "../common/CodeEditor/CodeEditor";
import classes from "./ShowCode.module.css";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/auth";

export default function ShowCode() {
  const { id } = useParams();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [user, setUser] = useState("");
  const [githubBio, setGithubBio] = useState("");
  const [pfp, setpfp] = useState("");

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

  const fetchCodeData = async () => {
    const docRef = doc(db, "buttons", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setHtml(data.html || "");
      setCss(data.css || "");
      setJs(data.js || "");
      setUser(data.githubUsername || "");
    } else {
      console.log("Link Invalid");
    }
  };

  useEffect(() => {
    fetchCodeData();
  }, [id]);

  useEffect(() => {
    const fetchGithubBio = async () => {
      try {
        const usersQuery = query(
          collection(db, "users"),
          where("githubUsername", "==", user)
        );
        const usersSnap = await getDocs(usersQuery);
        if (!usersSnap.empty) {
          usersSnap.forEach((doc) => {
            const userData = doc.data();
            console.log(userData); // Log the user data object to the console
            setGithubBio(userData.bio || "");
            setpfp(userData.profilePictureUrl || "");
          });
        } else {
          console.log("User document does not exist!");
        }
      } catch (error) {
        console.log("Error getting user document:", error);
      }
    };

    if (user) {
      fetchGithubBio();
    }
  }, [user]);

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
        <div className={classes.user_info}>
          <div className={classes.user_row}>
            <div className={classes.image_container}>
              <img className={classes.image} src={pfp} alt="" />
            </div>
            <div className={classes.user_data}>
              <h3 className={classes.username}>@{user}</h3>
            </div>
          </div>
          <p>{githubBio} </p>
          <Link to={`/user/${user}`}>See More Buttons from {user}</Link>
        </div>
      </div>

      <div className={classes.components_container}>
        {html && (
          <CodeEditor
            html={html}
            setHtml={setHtml}
            css={css}
            setCss={setCss}
            js={js}
            setJs={setJs}
          />
        )}
      </div>
    </div>
  );
}
