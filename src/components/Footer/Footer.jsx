import React from "react";
import {
  FaGithubSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import classes from "./Footer.module.css";

const Footer = ({modeToggle}) => {

  const toggleMode = modeToggle ? classes.dark_mode : classes.light_mode;

  return (
    <div>
      <div className={`${classes.footer} ${toggleMode}`}>
        <div className={classes.footer_left}>
          <p className={classes.footer_copyright}>
            © 2023 by{" "}
            <span>
              <a href="https://github.com/spyware007">Spyware007</a>
            </span>
            . All rights reserved.
          </p>
          <p className={classes.footer_rights}>
            This website is open source on{" "}
            <span>
              <a href="https://github.com/Spyware007/Animating-Buttons">
                GitHub
              </a>
            </span>
            .
          </p>
        </div>
        <ul className={classes.footer_right}>
          <li className={classes.footer_icons}>
            <a className={classes.linkg} href="https://github.com/spyware007">
              <FaGithubSquare className={classes.glow} />
            </a>
          </li>
          <li className={classes.footer_icons}>
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
          <li className={classes.footer_icons}>
            <a className={classes.linkt} href="https://twitter.com/oom_gawande">
              <FaTwitterSquare className={classes.glow} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
