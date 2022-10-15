import React from "react";
import classes from "./Navbar.module.css";
import github from "../../assets/github.png";
import gdsc from "../../assets/gdsc.png";
import moon from "../../assets/moon.png"
import sun from "../../assets/sun.png"

const Navbar = ({ modeToggle, modeToggleFunc }) => {
  return (
    <>
      <nav className={classes.navbar}>
        <a
          className={classes.link}
          href="https://gdsc.community.dev/dy-patil-college-of-engineering-pune/"
          target="_blank"
          rel="noreferrer"
        >
          <img className={classes.logo} src={gdsc} alt="gdsc_logo" />
        </a>
        <button className={`${classes.mode_toggle} ${modeToggle ? classes.dark_mode : classes.light_mode}`} onClick={()=>modeToggleFunc(!modeToggle)}>
          <img src={modeToggle ? sun : moon} alt="" />
        </button>
        <a
          className={classes.link}
          href="https://github.com/Spyware007/Animating-Buttons"
          target="_blank"
          rel="noreferrer"
        >
          <img className={classes.github} src={github} alt="github_link" />
        </a>
      </nav>
    </>
  );
};

export default Navbar;
