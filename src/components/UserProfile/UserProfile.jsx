import React from "react";
import classes from "./UserProfile.module.css";
import { Link, useParams } from "react-router-dom";
import { Twitter, LinkedIn } from "../../assets/svg";
import Memoji from "../../assets/memoji.png";

const UserProfile = () => {
  const { userId } = useParams();
  const user = userId;

  return (
    <>
      <div className={classes.user_info}>
        <div className={classes.user_row}>
          <div className={classes.image_container}>
            <img className={classes.image} src={Memoji} alt="" />
          </div>
          <div className={classes.user_data}>
            <h3 className={classes.username}>@{user}</h3>
            <div className={classes.socials}>
              <Twitter />
              <LinkedIn />
            </div>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>
        <Link to={`/user/${user}`}>See More Buttons from {user}</Link>
      </div>
    </>
  );
};

export default UserProfile;
