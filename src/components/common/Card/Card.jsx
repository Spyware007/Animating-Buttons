import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import LikeButton from "../LikeButton/LikeButton";
import JSZip from "jszip";
import { saveAs } from "file-saver";
// import ViewsIcon from "../ViewsIcon/ViewsIcon";

function download(css, html, js, name) {
  const zip = new JSZip();
  zip.file("style.css", css);
  zip.file("index.html", html);
  zip.file("app.js", js);

  zip.generateAsync({ type: "blob" }).then((zipFile) => {
    saveAs(zipFile, `${name} files.zip`);
  });
}

export default function Card({ button }) {
  const btnId = button.id;
  const user = button.githubUsername;
  const [profilePicture, setProfilePicture] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) {
          const q = query(
            collection(db, "users"),
            where("githubUsername", "==", user)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const { profilePictureUrl } = userData;
            setProfilePicture(profilePictureUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [user]);

  return (
    <div className={classes.card_container}>
      <iframe
        className={classes.iframe_container}
        title={btnId}
        srcDoc={`
            <html>
              <head><style>${button.css}</style></head>
              <body>${button.html}<script>${button.js}</script></body>
            </html>
          `}
        sandbox="allow-scripts"
      ></iframe>

      <div className={classes.contributor_info}>
        <div className={classes.contributor_data}>
          <div className={classes.contributor_img_container}>
            <img
              className={classes.contributor_img}
              src={profilePicture}
              alt="User"
            />
          </div>
          <Link to={`/user/${user}`} className={classes.contributor_name}>
            {user}
          </Link>
        </div>
        <div className={classes.btns_container}>
          <Link to={`/show/${btnId}`}>
            <Button show={true} />
          </Link>
          <Button
            onClick={() => download(button.css, button.html, button.js, user)}
          />
        </div>
      </div>

      <div className={classes.stats_btn}>
        {/* <ViewsIcon /> */}
        <LikeButton btnId={btnId} />
      </div>
    </div>
  );
}
