import React from "react";
import classes from "./AboutCard.module.scss";

const AboutCard = () => {
  return (
    <>
      <div className={classes.about_card}>
        <div className={classes.creator_details}>
          <div className={classes.image_container}>
            <img className={classes.image} src="" alt="" loading="lazy" />
          </div>
          <h1 className={classes.creator_name}>Om Gawande</h1>
          <a
            className={classes.creator_link}
            href="mailto:omgawandeofficial9834899149@gmail.com"
          >
            G-mail
          </a>
          <a
            className={classes.creator_link}
            href="https://www.linkedin.com/in/om-gawande/"
          ></a>
        </div>
        <div className={classes.project_details}></div>
      </div>
    </>
  );
};

export default AboutCard;
