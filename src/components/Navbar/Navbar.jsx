import React from "react";
import classes from "./Navbar.module.css";
import github from "../../assets/github.png";
import gdsc from "../../assets/gdsc.png";

const Navbar = () => {
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
        <a
          className={classes.link}
          href="https://github.com/DSC-DYPCOE/Animating-Buttons"
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
