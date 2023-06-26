import React from "react";
import {
  FaGithubSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import classes from "./Footer.module.css";

const Footer = ({ modeToggle }) => {
  const isDark = modeToggle ? classes.dark_mode : classes.light_mode;
  return (
    <div className={`${classes.footer} ${isDark}`}>
      <div className={classes.footer_left}>
        <p className={classes.footer_copyright}>
          © 2023 by <a href="https://github.com/spyware007">Spyware007</a>
          {""}. All rights reserved.
        </p>
        <p className={classes.footer_rights}>
          This website is open source on{" "}
          <a href="https://github.com/Spyware007/Animating-Buttons">GitHub</a>
        </p>
      </div>
      <ul className={classes.footer_right}>
        <li className={classes.footer_icons}>
          <a className={classes.linkg} href="https://github.com/spyware007">
            <FaGithubSquare className={classes.glow} />
          </a>
        </li>
        <li className={classes.footer_icons_2}>
          <a
            className={classes.linki}
            href="https://www.instagram.com/spyware007_/"
          >
            <FaInstagramSquare className={classes.glow} />
          </a>
        </li>
        <li className={classes.footer_icons}>
          <a
            className={classes.linkl}
            href="https://www.linkedin.com/in/om-gawande/"
          >
            <FaLinkedin className={classes.glow} />
          </a>
        </li>
        <li className={classes.footer_icons_2}>
          <a className={classes.linkt} href="https://twitter.com/oom_gawande">
            <FaTwitterSquare className={classes.glow} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
