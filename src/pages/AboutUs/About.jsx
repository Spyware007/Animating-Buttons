import React from "react";
import Timeline from "../../components/Timeline/Timeline";
import { Twitter, LinkedIn } from "../../assets/svg";
import Contributor from "./Contributor";
import memoji from "../../assets/memoji.png";
import classes from "./About.module.css";
import { motion } from "framer-motion";

import { leftParaAnim } from "../../components/Animation/motion";
import { imgAnim } from "../../components/Animation/motion";
import { fadeIn } from "../../components/Animation/motion";



const About = ({ modeToggle }) => {
  return (
    <div
      className={`${classes.about} ${!modeToggle ? classes["about-light"] : classes["about-dark"]
        }`}
    >


      <div className={classes.Header}>
        <div>
          <motion.img
            src={memoji}
            variants={imgAnim}
            initial="hidden"
            whileInView={{
              scale: [0, 1],
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={classes.admin_img}
            alt="admin img"
          ></motion.img>
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={classes.Admin_name}
          >
            Om Gawande
          </motion.h1>
          <motion.p
            variants={fadeIn}
            whileInView="visible"
            initial="hidden"
            transition={{ duration: 0.4, delay: 0.45 }}
            viewport={{ once: true }}
            className={classes.Project_Admin}
          >
            Project Admin
          </motion.p>
          <div className={classes.social_profilee}>
            <a
              href="https://www.linkedin.com/in/om-gawande/"
              target="__blank"
              className={classes.link2}
            >
              <LinkedIn className={classes.glow} />
            </a>
            <a
              href="https://twitter.com/oom_gawande"
              target="__blank"
              className={classes.link1}
            >
              <Twitter />
            </a>
          </div>
        </div>
        <div className={classes.Para}>
          <motion.h1
            variants={leftParaAnim}
            initial="hidden"
            whileInView="visible"
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 60,
            }}
            viewport={{ once: true }}
            className={classes.About_h1}
          >
            About Us
          </motion.h1>
          <motion.p
            variants={leftParaAnim}
            initial="hidden"
            whileInView="visible"
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 50,
            }}
            viewport={{ once: true }}
            className={classes.About_p}
          >
            Welcome to Animating Buttons,an initiative by GDSC-DYPCOE for Hacktoberfest. Our website offers a diverse collection of stunning CSS and HTML button animations to enhance your projects. With a focus on engaging user experiences, we provide a range of styles, effects, and transitions to suit any aesthetic.
          </motion.p>
          <motion.p
            variants={leftParaAnim}
            initial="hidden"
            whileInView="visible"
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 50,
            }}
            viewport={{ once: true }}
            className={classes.About_p}
          >
            <br />
            Leading this project is our esteemed Project Admin, Om Gawande. Our buttons are meticulously designed to meet modern standards, ensuring compatibility across browsers and devices. Whether you seek subtle hover effects or dynamic animations, our collection offers abundant choices.
          </motion.p>
          <motion.p
            variants={leftParaAnim}
            initial="hidden"
            whileInView="visible"
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 50,
            }}
            viewport={{ once: true }}
            className={classes.About_p}
          >
            <br />
            We invite you to explore our website and discover the endless possibilities. Whether you're a beginner or an experienced developer, Animating Buttons has something for everyone.
          </motion.p>
        </div>
      </div>
      <Contributor />
      <div className={classes.TimeLine_Css}>
        <p className={classes.About_p_o}>Timeline</p>
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className={classes.About_h1}
        >
          Do read this
        </motion.h1>
        <motion.p
          variants={fadeIn}
          whileInView="visible"
          initial="hidden"
          transition={{ duration: 0.4, delay: 0.45 }}
          viewport={{ once: true }}
          className={classes.About_p_t}
        >
          {" "}
          The Progress of the project so far.
        </motion.p>
      </div>
      <Timeline modeToggle={modeToggle} />
    </div>
  );
};

export default About;
