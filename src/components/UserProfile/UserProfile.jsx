import React, { useState } from "react";
import classes from "./UserProfile.module.css";
import { Link, useParams } from "react-router-dom";
import { Twitter, LinkedIn } from "../../assets/svg";
import Memoji from "../../assets/memoji.png";
import { Data } from "../../Data";
import Card from "../common/Card/Card";

const UserProfile = () => {
  const { userId } = useParams();
  const user = userId;

  const filteredArray = Data.reduce((acc, username) => {
    const cleanedUsername = username.replace(/_\d+$/, "");
    acc[cleanedUsername] = acc[cleanedUsername] || [];
    acc[cleanedUsername].push(username);
    return acc;
  }, {});
  const [query, setQuery] = useState("");

  const newArray = filteredArray[user];
  console.log(newArray);
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
      <div>
        <div className={classes.btns_container}>
          {newArray
            .filter((d) => d.toLowerCase().includes(query.toLowerCase()))
            .map((d, i) => {
              console.log(d);
              return <Card key={i} button={d} />;
            })}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
