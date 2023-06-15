import React from "react";
import classes from "./Score.module.css";
import { Data } from "../../Data";
import memoji from "../../assets/memoji.png";

const Score = () => {
  const cleanedArray = Data.map((item) => item.replace(/_\d+$/, ""));
  const uniqueValues = new Set(cleanedArray);

  const hashmap = {};

  uniqueValues.forEach((item) => {
    const count = cleanedArray.filter((value) => value === item).length;
    hashmap[item] = count;
  });

  const sortedArray = Object.entries(hashmap).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <h1 className={classes.leaderboard_text}>LEADERBOARD</h1>
      <div className={classes.leaderboard}>
        {sortedArray.map(([name, count], index) => (
          <div key={name} className={classes.item}>
            <img src={memoji} alt="Profile" className={classes.profileImage} />
            <div className={classes.details}>
              <div className={classes.name}>{name}</div>
              <div className={classes.count}>{count} buttons added</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Score;
