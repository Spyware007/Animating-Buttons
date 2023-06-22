import React, { useEffect, useState } from "react";
import classes from "./Score.module.css";
import { Link } from "react-router-dom";
import memoji from "../../assets/memoji.png";
import { collection, getDocs, } from 'firebase/firestore'
import { db } from "../../firebase/auth"

const Score = () => {

  const [buttons, setButtons] = useState([])
  const [users, setusers] = useState([])
  
  useEffect(() => {
    fetchButtons();
  }, [])

  async function fetchButtons() {
    const btnsCol = collection(db, "buttons");
    const usersCol = collection(db, "users");

    const btnsSnapshot = await getDocs(btnsCol);
    const usersSnapshot = await getDocs(usersCol);

    const btnsList = btnsSnapshot.docs.map(doc => doc.data());
    const usersList = usersSnapshot.docs.map(doc => doc.data());

    setButtons(btnsList);
    setusers(usersList);
  }

  function getProfilePicture(username) {
    // find the user object that matches the input parameter
    let user = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    return user ? (user.profilePictureUrl) : memoji;
  }


  // const cleanedArray = Data.map((item) => item.replace(/_\d+$/, ""));
  const cleanedArray = buttons.map(btn => btn.githubUsername)
  const uniqueValues = new Set(cleanedArray);

  const hashmap = {};

  uniqueValues.forEach((item) => {
    const count = cleanedArray.filter((value) => value === item).length;
    hashmap[item] = count;
  });

  const sortedArray = Object.entries(hashmap).sort((a, b) => b[1] - a[1]);
  let rank = 1;

  return (
    <>
      <h1 className={classes.leaderboard_text}>LEADERBOARD</h1>
      <div className={classes.leaderboard}>
        {sortedArray.map(([name, count], index) => (
          <Link to={`/user/${name}`} key={index} className={classes.item}>
            <span className=
              {classes.rank}>{rank++ + "."}</span>
            <img src={getProfilePicture(name)} alt="Profile" className={classes.profileImage} />
            <div className={classes.details}>
              <div className={classes.name}>{name}</div>
              <div className={classes.count}>{count} buttons added</div>
            </div>
          </Link>
        ))}
      </div >
    </>
  );
};

export default Score;
