import React, { useEffect, useState } from "react";
import classes from "./Score.module.css";
import { Link } from "react-router-dom";
import memoji from "../../assets/memoji.png";
import Loader from "../common/Loader/Loader";

export default function Score(props) {
  const { buttonsData, usersData } = props;

  const [currentList, setCurrentList] = useState("likes");
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    buttonsData.sort((a, b) => b.likeCounter - a.likeCounter);
  }, [buttonsData]);

  const getProfilePicture = (username) => {
    const user = usersData.find(
      (user) => user.githubUsername.toLowerCase() === username.toLowerCase()
    );
    return user ? user.profilePictureUrl : memoji;
  };

  if (buttonsData.length === 0 || usersData.length === 0) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const { hashmap, totalLikes } = buttonsData.reduce(
    (acc, { githubUsername, likeCounter }) => {
      acc.hashmap[githubUsername] = (acc.hashmap[githubUsername] || 0) + 1;
      acc.totalLikes[githubUsername] =
        (acc.totalLikes[githubUsername] || 0) + likeCounter;
      return acc;
    },
    { hashmap: {}, totalLikes: {} }
  );

  const sortedUsers = Object.entries(hashmap).sort((a, b) => b[1] - a[1]);
  const sortedLikes = Object.entries(totalLikes).sort((a, b) => b[1] - a[1]);

  let rankNumber = 1;
  let rankLikes = 1;

  
  return (
    <>
      <div className={classes.header}>
        <h1 className={classes.leaderboard_text}>LEADERBOARD</h1>
        <div className={classes.dropdown}>
          <button
            className={classes.dropbtn}
            onClick={() => setDropdown(!dropdown)}
          >
            Sort By
          </button>
          {dropdown && (
            <div className={classes.dropdown_content}>
              <button
                className={classes.content_btn}
                onClick={() => {
                  setCurrentList("buttons");
                  setDropdown(false);
                }}
              >
                Buttons
              </button>
              <button
                className={classes.content_btn}
                onClick={() => {
                  setCurrentList("likes");
                  setDropdown(false);
                }}
              >
                Likes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={classes.list}>
        <div className={classes.leaderboard}>
          <h2 className={classes.category}>
            Based On Number Of {currentList === "buttons" ? "Buttons" : "Likes"}
          </h2>
          {currentList === "buttons"
            ? sortedUsers.map(([name, count], index) => (
                <Link to={`/user/${name}`} key={index} className={classes.item}>
                  <span className={classes.rank}>{rankNumber++ + "."}</span>
                  <img
                    src={getProfilePicture(name)}
                    alt="Profile"
                    className={classes.profileImage} loading="lazy"
                  />
                  <div className={classes.details}>
                    <div className={classes.name}>{name}</div>
                    <div className={classes.count}>{count} buttons added</div>
                  </div>
                </Link>
              ))
            : sortedLikes.map(([name, count], index) => (
                <Link to={`/user/${name}`} key={index} className={classes.item}>
                  <span className={classes.rank}>{rankLikes++ + "."}</span>
                  <img
                    src={getProfilePicture(name)}
                    alt="Profile"
                    className={classes.profileImage} loading="lazy"
                  />
                  <div className={classes.details}>
                    <div className={classes.name}>{name}</div>
                    <div className={classes.count}>Total Likes: {count}</div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}
