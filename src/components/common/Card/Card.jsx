import React from "react";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import LikeButton from "../LikeButton/LikeButton";

import downloadZip from "../../../Functions/DownloadZip";
import ViewsIcon from "../ViewsIcon/ViewsIcon";

const Card = ({ button = "hello_1" }) => {
  const user = button.split("_")[0];
  console.log(button);
  return (
    <>
      <div className={classes.card_container}>
        <iframe
          className={classes.iframe_container}
          title={button}
          src={`Buttons/${button}/index.html`}
          sandbox="allow-scripts"
        ></iframe>

        <div className={classes.contributor_info}>
          <div className={classes.contributor_data}>
            <div className={classes.contributor_img_container}>
              <img
                className={classes.contributor_img}
                src="https://avatars.githubusercontent.com/u/76893714?v=4"
                alt="Spyware007"
              />
            </div>
            <Link to={`/user/${user}`} className={classes.contributor_name}>
              {user}
            </Link>
          </div>
          <div className={classes.btns_container}>
            <Link to={`/show/${button}`}>
              <Button show={true} />
            </Link>
            <Button onClick={() => downloadZip(button)} />
          </div>
        </div>
        <div className={classes.stats_btn}>
          {/* <ViewsIcon /> */}
          <LikeButton />
        </div>
      </div>
    </>
  );
};

export default Card;
