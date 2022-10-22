import React from "react";
import {
  FaGithubSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={classes.footer}>
        <div className={classes.footer_left}>
          <p className={classes.footer_copyright}>
            © 2022 by{" "}
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
              <FaGithubSquare />
            </a>
          </li>
          <li className={classes.footer_icons}>
            <a
              className={classes.linki}
              href="https://www.instagram.com/spyware007_/"
            >
              <FaInstagramSquare />
            </a>
          </li>
          <li className={classes.footer_icons}>
            <a
              className={classes.linkl}
              href="https://www.linkedin.com/in/om-gawande/"
            >
              <FaLinkedin />
            </a>
          </li>
          <li className={classes.footer_icons}>
            <a className={classes.linkt} href="https://twitter.com/oom_gawande">
              <FaTwitterSquare />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
