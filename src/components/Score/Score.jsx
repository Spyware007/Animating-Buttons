import React, { useEffect, useState } from "react";
import classes from "./Score.module.css";
import { Link } from "react-router-dom";
import { Data } from "../../Data";
import memoji from "../../assets/memoji.png";
import { collection, getDocs, } from 'firebase/firestore'
import { db } from "../../firebase/auth"

const Score = () => {

  const [buttons, setButtons] = useState([])
  useEffect(() => {
    fetchButtons();
  }, [])

  async function fetchButtons() {
    const btnsCol = collection(db, "buttons");
    const btnsSnapshot = await getDocs(btnsCol);
    const btnsList = btnsSnapshot.docs.map(doc => doc.data());
    setButtons(btnsList);
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
            <img src={memoji} alt="Profile" className={classes.profileImage} />
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
