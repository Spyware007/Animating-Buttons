import React from "react";
import classes from "./Navbar.module.css";
import github from "../../assets/github.png";
import gdsc from "../../assets/gdsc.png";
import spider from "../../assets/spider.png";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";

const Navbar = ({ modeToggle, modeToggleFunc }) => {
  const toogleMode = modeToggle ? classes.dark_mode : classes.light_mode;
  return (
    <div className={classes.navWrap}>
      <div className={`${classes.navCont} ${toogleMode}`}>
        <nav className={classes.navbar}>
            <a
              className={classes.link}
              href="https://gdsc.community.dev/dy-patil-college-of-engineering-pune/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={classes.logo} src={gdsc} alt="gdsc_logo" />
            </a>
            <a
              className={classes.spider}
              href="https://github.com/spyware007"
              target="_blank"
              rel="noreferrer"
            >
              <img className={classes.spider_img} src={spider} alt="spider_logo" />
            </a>
            <div
              className={`${classes.mode_toggle} ${
                modeToggle ? classes.dark_mode : classes.light_mode
              }`}
              onClick={() => modeToggleFunc(!modeToggle)}
            >
              <img src={modeToggle ? sun : moon} alt="" />
            </div>
            <a
              className={classes.link}
              href="https://github.com/Spyware007/Animating-Buttons"
              target="_blank"
              rel="noreferrer"
            >
              <img className={classes.github} src={github} alt="github_link" />
            </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
