import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/auth";
import axios from "axios";
import { getAuth } from "firebase/auth";

import classes from "./LikeButton.module.css";

export default function LikeButton({ btnId }) {
  const [liked, setLiked] = useState(false);
  const [likesAmount, setLikesAmount] = useState(0);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
        fetchGithubData(user);
      } else {
        setUserLoggedIn(false);
        setGithubUsername("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const docRef = doc(db, "buttons", btnId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setLikesAmount(data.likeCounter);
          setLiked(data.likedUsers.includes(githubUsername));
        }
      } catch (error) {
        console.log("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [btnId, githubUsername]);

  const fetchGithubData = async (user) => {
    const githubId = user.providerData[0].uid;

    try {
      const response = await axios.get(
        `https://api.github.com/user/${githubId}`
      );

      const { login } = response.data;
      setGithubUsername(login);
    } catch (error) {
      console.log("Error fetching GitHub data:", error);
    }
  };

  const handleLike = async () => {
    if (!userLoggedIn) {
      // If user is not logged in, don't perform the like action
      window.alert("Please loggin first");
      return;
    }

    try {
      const docRef = doc(db, "buttons", btnId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const updatedLikeCounter = liked
          ? data.likeCounter - 1
          : data.likeCounter + 1;
        let updatedLikeUsers = [...data.likedUsers];

        if (liked) {
          // Remove the username from the array
          updatedLikeUsers = updatedLikeUsers.filter(
            (username) => username !== githubUsername
          );
        } else {
          // Append the username to the array
          updatedLikeUsers.push(githubUsername);
        }

        await updateDoc(docRef, {
          likeCounter: updatedLikeCounter,
          likedUsers: updatedLikeUsers,
        });

        setLiked((prevState) => !prevState);
        setLikesAmount(updatedLikeCounter);
      }
    } catch (error) {
      console.log("Error updating like:", error);
    }
  };

  return (
    <div onClick={handleLike} className={classes.likeButton}>
      <div className={classes.heartBg}>
        <div
          className={`${classes.heartIcon} ${liked ? classes.liked : ""}`}
        ></div>
      </div>
      <h1 className={classes.likesAmount}>{likesAmount}</h1>
    </div>
  );
}
