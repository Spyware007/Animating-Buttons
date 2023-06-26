import React, { useEffect, useState } from "react";
import classes from "./UserProfile.module.css";
import { Link, useParams } from "react-router-dom";
import Card from "../common/Card/Card";
import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/auth";

const UserProfile = () => {
  const { userId } = useParams();
  const user = userId;
  const [githubBio, setGithubBio] = useState("");
  const [githubSocialAccounts, setGithubSocialAccounts] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [buttons, setButtons] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    fetchGithubData();
  }, []);
  const fetchGithubData = async () => {
    //   const githubId = user?.providerData[0]?.uid || user;
    const githubId = user;
    console.log(githubId);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${githubId}`
      );
      console.log(response);
      const {
        bio,
        blog,
        twitter_username,
        linkedin_username,
        name,
        avatar_url,
      } = response.data;
      console.log(response.data);
      setGithubBio(bio);
      setAvatarUrl(avatar_url);
      setName(name);
      const socialAccounts = [];

      if (blog) {
        socialAccounts.push({ name: "Blog", url: blog });
      }

      if (twitter_username) {
        socialAccounts.push({
          name: "Twitter",
          url: `https://twitter.com/${twitter_username}`,
        });
      }

      if (linkedin_username) {
        socialAccounts.push({
          name: "LinkedIn",
          url: `https://linkedin.com/in/${linkedin_username}`,
        });
      }

      setGithubSocialAccounts(socialAccounts);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  // const filteredArray = Data.reduce((acc, username) => {
  //   const cleanedUsername = username.replace(/_\d+$/, "");
  //   acc[cleanedUsername] = acc[cleanedUsername] || [];
  //   acc[cleanedUsername].push(username);
  //   return acc;
  // }, {});
  // const [query, setQuery] = useState("");

  // const newArray = filteredArray[user];
  // console.log(newArray);

  // Function to fetch buttons by GitHub username
  const fetchButtons = async () => {
    try {
      const buttonsCollection = collection(db, "buttons");
      const querySnapshot = await getDocs(
        query(buttonsCollection, where("githubUsername", "==", userId))
      );
      const buttonsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, autoid: doc.id }; // Add autogenerated ID as autoid
      });
      return buttonsData;
    } catch (error) {
      console.error("Error fetching buttons:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchButtonsData = async () => {
      const fetchedButtons = await fetchButtons();
      setButtons(fetchedButtons);
    };

    fetchButtonsData();
  }, []);
  return (
    <>
      <div className={classes.user_info}>
        <div className={classes.user_row}>
          <div className={classes.image_container}>
            <img className={classes.image} src={avatarUrl} alt="" />
          </div>
          <div className={classes.user_data}>
            <h3 className={classes.username}>@{user}</h3>
            <h3 className={classes.name}>{name}</h3>
            <div className={classes.socials}>
              {/* <Twitter />
              <LinkedIn /> */}
            </div>
          </div>
        </div>
        <p>{githubBio}</p>
        <Link to={`/user/${user}`}>See More Buttons from {user}</Link>
      </div>
      <div>
        <div className={classes.btns_container}>
          {buttons.map((btn, i) => (
            <Card key={i} button={btn} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
