import React from "react";
import Timeline from "../../components/Timeline/Timeline";

import Contributor from "./Contributor";
import memoji from "../../assets/memoji.png";
import classes from "./About.module.css";
const About = ({ modeToggle }) => {
  return (
    <>
      <div className={classes.Header}>
        <div>
          <img src={memoji} className={classes.admin_img} alt="admin img"></img>
          <h1 className={classes.Admin_name}>Om Gawande</h1>
          <p className={classes.Project_Admin}>Project Admin</p>
        </div>
        <div className={classes.Para}>
          <h1 className={classes.About_h1}>About Us</h1>
          <p className={classes.About_p}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
            <br />
            <br />
            adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <Contributor />
      <div className={classes.TimeLine_Css}>
        <p className={classes.About_p_o}>Timeline</p>
        <h1 className={classes.About_h1}>Do read this</h1>
        <p className={classes.About_p_t}>
          {" "}
          The Progress of the project so far.
        </p>
      </div>
      <Timeline modeToggle={modeToggle} />
    </>
  );
};

export default About;
