import React, { useState, useEffect, useMemo, useCallback } from "react";
import { db } from "../../../firebase/auth";
import {
  getDocs,
  query,
  collection,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import LikeButton from "../LikeButton/LikeButton";
import DeleteButton from "../deleteBtn/DeleteButton";
import EditbtnBtn from "../EditbtnBtn/EditbtnBtn";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";



const download = async (css, html, js, name) => {
  const zip = new JSZip();
  try {
    zip.file("style.css", css || '');
    zip.file("index.html", html || '');
    zip.file("app.js", js || '');

    const zipFile = await zip.generateAsync({ type: "blob" });
    saveAs(zipFile, `${name || 'button'}_files.zip`);
    toast.success('Downloaded Successfully');
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Download failed. Please try again.');
  }
};

const Card = React.memo(function Card({ modeToggle, button }) {
  if (!button || !button.id) {
    return null;
  }

  const btnId = button.id;
  const user = button.githubUsername;
  const [profilePicture, setProfilePicture] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized profile picture URL
  const profilePictureUrl = useMemo(() => {
    return profilePicture || `https://github.com/${user}.png`;
  }, [profilePicture, user]);

  // Memoized iframe content
  const iframeContent = useMemo(() => {
    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${button.css || ''}</style>
        </head>
        <body>
          ${button.html || ''}
          <script>${button.js || ''}</script>
        </body>
      </html>
    `;
  }, [button.css, button.html, button.js]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchUser = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const q = query(
          collection(db, "users"),
          where("githubUsername", "==", user)
        );
        const querySnapshot = await getDocs(q);

        if (isMounted && !querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const { profilePictureUrl } = userData;
          if (profilePictureUrl) {
            setProfilePicture(profilePictureUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchUser();
    
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleDelete = useCallback(async () => {
    const sure = window.confirm("Are you sure you want to delete this button?");
    if (!sure) return;

    try {
      setIsLoading(true);
      const buttonRef = doc(db, "buttons", button.id);
      await deleteDoc(buttonRef);
      setDeleted(true);
      toast.success("Button deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete button. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [button.id]);

  const handleDownload = useCallback(() => {
    download(button.css, button.html, button.js, user);
  }, [button.css, button.html, button.js, user]);

  return (
    <>
      {!deleted && (
        <div
          className={`${classes.card_container} ${modeToggle ? classes["dark-container"] : classes["light-container"]
            } }`}
        >
          <div className={classes.frame}>
            <iframe
              className={classes.iframe_container}
              style={{ width: "100%", height: "100%" }}
              title={`Button ${btnId}`}
              srcDoc={iframeContent}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          </div>
          <div className={classes.contributor_info}>
            <div className={classes.contributor_data}>
              <div className={classes.contributor_img_container}>
                {isLoading ? (
                  <div className={classes.loading_placeholder}>...</div>
                ) : (
                  <img
                    className={classes.contributor_img}
                    src={profilePictureUrl}
                    alt={`${user}'s profile`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://github.com/${user}.png`;
                    }}
                  />
                )}
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
                onClick={handleDownload}
              />
            </div>
          </div>

          <div className={classes.stats_btn}>
            <DeleteButton 
              modeToggle={modeToggle} 
              handleDelete={handleDelete}
              disabled={isLoading}
            />
            <Link to={`/show/${btnId}`}>
              <EditbtnBtn modeToggle={modeToggle} />
            </Link>
            <LikeButton btnId={btnId} />
          </div>
        </div>
      )}
    </>
  );
});

export default Card;
