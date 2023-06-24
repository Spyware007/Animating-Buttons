import React from "react";
import classes from "./Landing.module.css";
import ButtonsSvg from "../../assets/buttons.svg";
import RepoInfo from "../common/RepoInfo/RepoInfo";
import { Twitter, LinkedIn } from "../../assets/svg";
import Memoji from "../../assets/memoji.png";

const Landing = ({ modeToggle, modeToggleFunc }) => {
  return (
    <>
      <section
        className={`${classes.landing} ${
          !modeToggle ? classes["landing-light"] : classes["landing-dark"]
        }`}
      >
        <div className={classes.header}>
          <h1 className={classes.heading}>Animating-Buttons</h1>
          <p className={classes.para}>
            Explore Amazing Buttons animation for your next project.
          </p>
          <RepoInfo />
        </div>
        <div className={classes.socials}>
          <div className={classes.memoji}>
            <img className={classes.image} src={Memoji} alt="memoji" />
          </div>
          <div className={classes.social_profile}>
            <a
              href="https://twitter.com/oom_gawande"
              target="__blank"
              className={classes.link}
            >
              <Twitter />
              <span className={classes.text}>@oom_gawande</span>
            </a>
            <a
              href="https://www.linkedin.com/in/om-gawande/"
              target="__blank"
              className={classes.link}
            >
              <LinkedIn />
              <span className={classes.text}>/om-gawande</span>
            </a>
          </div>
        </div>
        <div className={classes.rectangle}>
          <img
            className={classes.button_image}
            src={ButtonsSvg}
            alt="buttons"
          />
        </div>
      </section>
    </>
  );
};

export default Landing;
