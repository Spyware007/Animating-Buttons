import React from "react";

import classes from "./About.module.css";
function ContributorCard({ contributor, index }) {
  return (
    <div key={contributor?.id} style={{ width: "11rem" }}>
      <a
        rel="noopener noreferrer"
        href={`https://github.com/${contributor?.login}`}
        aria-label="GitHub"
        className={classes.About_Data}
      >
        <img
          src={contributor?.avatar_url}
          alt="avatar"
          className={classes.Avtar}
        />
      </a>
      <div className={classes.Counter1}>
        <h2 className={classes.Counter2}>{contributor?.login}</h2>
        <p
          className={classes.Counter3}
        >{`Contributions: ${contributor?.contributions}`}</p>
      </div>
    </div>
  );
}

export default ContributorCard;
