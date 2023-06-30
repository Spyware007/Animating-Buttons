import React from "react";
import Timeline from "../../components/Timeline/Timeline";
import { Twitter, LinkedIn } from "../../assets/svg";
import Contributor from "./Contributor";
import memoji from "../../assets/memoji.png";
import classes from "./About.module.css";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/Animation/motion";

const About = ({ modeToggle }) => {
  return (
    <div
      className={`${classes.about} ${
        !modeToggle ? classes["about-light"] : classes["about-dark"]
      }`}
    >
      <div className={classes.Header}>
        <div>
          <motion.img variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} src={memoji} className={classes.admin_img} alt="admin img"></motion.img>
          <motion.h1 variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} transition={{delay : 0.1}} className={classes.Admin_name}>Om Gawande</motion.h1>
          <motion.p variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} transition={{delay : 0.2}} className={classes.Project_Admin}>Project Admin</motion.p>
          <div className={classes.social_profilee}>
            <motion.a
            variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} transition={{delay : 0.3}}
              href="https://www.linkedin.com/in/om-gawande/"
              target="__blank"
              className={classes.link2}
            >
              <LinkedIn className={classes.glow} />
            </motion.a>
            <motion.a
            variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} transition={{delay : 0.4}}
              href="https://twitter.com/oom_gawande"
              target="__blank"
              className={classes.link1}
            >
              <Twitter />
            </motion.a>
          </div>
        </div>
        <div className={classes.Para}>
          <motion.h1 variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}}  className={classes.About_h1}>About Us</motion.h1>
          <motion.p variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} transition={{delay : 0.1}} className={classes.About_p}>
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
          </motion.p>
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
    </div>
  );
};

export default About;
