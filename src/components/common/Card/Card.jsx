import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/auth";
import {
  getDocs,
  query,
  collection,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import classes from "./Card.module.css";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import LikeButton from "../LikeButton/LikeButton";
import DeleteButton from "../deleteBtn/DeleteButton";
import JSZip from "jszip";
import { saveAs } from "file-saver";
// import { renderIntoDocument } from "react-dom/test-utils";
import { toast } from "react-hot-toast";
 


function download(css, html, js, name) {
  const zip = new JSZip();
  try {
    zip.file("style.css", css);
    zip.file("index.html", html);
    zip.file("app.js", js);
  
    zip.generateAsync({ type: "blob" }).then((zipFile) => {
      saveAs(zipFile, `${name} files.zip`);
    });
    toast.success('Downloaded Successfully')
  } catch (error) {
    console.log(error)
    toast.error('Something Went Wrong')
  }
}

export default function Card({ modeToggle, button }) {
  const btnId = button.id;
  const user = button.githubUsername;
  const [profilePicture, setProfilePicture] = useState({});
  const [deleted, setDeleted] = useState(false);

  // { console.log(button); }

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

  const location = useLocation();
  const handleDelete = async () => {
    const sure = window.confirm("Are You Sure ?");
    if (sure) {
      const buttonRef = doc(db, "buttons", button.id);
      await deleteDoc(buttonRef)
        .then(() => {
          setDeleted(true);
          console.log("Document successfully deleted!");
          toast.success("Successfully deleted!")
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
          toast.error("Error in deleting component!")
        });
    }
  };

  return (
    <>
      {!deleted && (
        <div
          className={`${classes.card_container} ${modeToggle ? classes["dark-container"] : classes["light-container"]
            } }`}
        >
          <div className={classes.frame} >
            <iframe
              className={classes.iframe_container}
              style={{ width: "100%", height: "100%" }}
              title={btnId}
              srcDoc={`
            <html>
              <head><style>${button.css}</style></head>
              <body>${button.html}<script>${button.js}</script></body>
            </html>
          `}
              sandbox="allow-scripts"
            ></iframe>
          </div>
          <div className={classes.contributor_info}>
            <div className={classes.contributor_data}>
              <div className={classes.contributor_img_container}>
                <img
                  className={classes.contributor_img}
                  src={profilePicture}
                  alt="User" loading="lazy"
                />
              </div>
            </div>
            <Link to={`/user/${user}`} className={classes.contributor_name}>
              {user}
            </Link>
            <div className={classes.btns_container}>
              <Link to={`/show/${btnId} `}>
                <Button modeToggle={modeToggle} show={true} />
              </Link>
              <Button
                modeToggle={modeToggle}
                onClick={() =>
                  download(button.css, button.html, button.js, user)
                }
              />
            </div>
          </div>

          <div className={classes.stats_btn}>
            {/* <ViewsIcon /> */}
            {auth.currentUser &&
              location.pathname.split("/")[2] ===
              auth?.currentUser?.reloadUserInfo?.screenName && (
                <DeleteButton handleDelete={handleDelete} />
              )}
            <LikeButton btnId={btnId} />
          </div>
        </div>
      )}
    </>
  )
}
