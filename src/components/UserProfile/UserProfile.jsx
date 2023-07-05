import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import classes from "./UserProfile.module.css";
import Card from "../common/Card/Card";

export default function UserProfile() {
  const { userId } = useParams(); //it is actually githubUsername
  const [githubBio, setGithubBio] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [buttons, setButtons] = useState([]);
  const [name, setName] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [userDocId, setUserDocId] = useState(""); //userID from firestore

  useEffect(() => {
    fetchUserData();
    fetchButtonData();
  }, []);

  const fetchUserData = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("githubUsername", "==", userId)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const { bio, name, profilePictureUrl } = userData;
        setUserDocId(querySnapshot.docs[0].id);
        setGithubBio(bio);
        setName(name);
        setProfilePictureUrl(profilePictureUrl);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchButtonData = async () => {
    try {
      const q = query(
        collection(db, "buttons"),
        where("githubUsername", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const buttonsData = querySnapshot.docs.map((doc) => doc.data());
        setButtons(buttonsData);
      }
    } catch (error) {
      console.error("Error fetching buttons data:", error);
    }
  };

  const handleSaveBio = async () => {
    try {
      const userDocRef = doc(db, "users", userDocId);
      await setDoc(userDocRef, { bio: newBio }, { merge: true });
      console.log(`Bio updated for user ${userId}`);
      setGithubBio(newBio);
      setEditingBio(false);
    } catch (error) {
      console.error("Error saving bio:", error);
    }
  };

  const handleEditBio = () => {
    setEditingBio(true);
    setNewBio(githubBio);
  };

  const handleCancelEditBio = () => {
    setEditingBio(false);
    setNewBio("");
  };

  const handleBioChange = (event) => {
    const newBioValue = event.target.value;
    setNewBio(newBioValue);
  };

  return (
    <>
      <div className={classes.user_info}>
        <div className={classes.user_row}>
          <div className={classes.image_container}>
            <img className={classes.image} src={profilePictureUrl} alt="" />
          </div>
          <div className={classes.user_data}>
            <h3 className={classes.username}>@{userId}</h3>
            <h3 className={classes.name}>{name}</h3>
            <div className={classes.socials}>{/* Social accounts */}</div>
          </div>
        </div>
        {editingBio ? (
          <>
            <textarea
              value={newBio}
              onChange={handleBioChange}
              className={classes.bio_textarea}
            />
            <div className={classes.edit_button}>
              <button onClick={handleSaveBio}>Save</button>
              <button onClick={handleCancelEditBio}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p>{githubBio}</p>
            {auth.currentUser &&
              userId === auth?.currentUser?.reloadUserInfo?.screenName && (
                <div className={classes.edit_button}>
                  <button onClick={handleEditBio}>Edit Bio</button>
                </div>
              )}
          </>
        )}
      </div>
      <div>
        <div className={classes.btns_container}>
          {buttons.map((button, i) => (
            <Card key={i} button={button} />
          ))}
        </div>
      </div>
    </>
  );
}
