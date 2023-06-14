import React, { useState } from "react";
import classes from "./LikeButton.module.css";

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likesAmount, setLikesAmount] = useState(240);

  const handleLike = () => {
    setLiked((prevState) => !prevState);
    setLikesAmount((prevAmount) => (liked ? prevAmount - 1 : prevAmount + 1));
  };

  return (
    <div className={classes.likeButton}>
      <div className={classes.heartBg} onClick={handleLike}>
        <div
          className={`${classes.heartIcon} ${liked ? classes.liked : ""}`}
        ></div>
      </div>
      <div className={classes.likesAmount}>{likesAmount}</div>
    </div>
  );
}

export default LikeButton;
