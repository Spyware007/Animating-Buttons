import React from "react";
import classes from "./Landing.module.css";
import ButtonsSvg from "../../assets/buttons.svg";
import RepoInfo from "../common/RepoInfo/RepoInfo";
import { Twitter, LinkedIn } from "../../assets/svg";
import Memoji from "../../assets/memoji.png";
import { motion } from "framer-motion";
import { paraAnim } from "../Animation/motion";
import { socialAnim } from "../Animation/motion";
import { imgAnim } from "../Animation/motion";
const Landing = ({ modeToggle, modeToggleFunc }) => {
  return (
    <>
      <section
        className={`${classes.landing} ${
          !modeToggle ? classes["landing-light"] : classes["landing-dark"]
        }`}
      >
        <div className={classes.header}>
          <motion.h1
            variants={paraAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60 }}
            className={classes.heading}
          >
            Animating-Buttons
          </motion.h1>
          <motion.p
            variants={paraAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50 }}
            className={classes.para}
          >
            Explore Amazing Buttons animation for your next project.
          </motion.p>
          <RepoInfo />
        </div>
        <div className={classes.socials}>
          <motion.div
            variants={imgAnim}
            initial="hidden"
            whileInView={{
              scale: [0.8, 1],
              opacity: 1,
            }}
            transition={{ duration: 0.84 }}
            className={classes.memoji}
          >
            <img className={classes.image} src={Memoji} alt="memoji" />
          </motion.div>
          <div className={classes.social_profile}>
            <motion.a
              href="https://twitter.com/oom_gawande"
              target="__blank"
              className={classes.link}
              variants={socialAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
            >
              <Twitter />
              <span className={classes.text}>@oom_gawande</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/om-gawande/"
              target="__blank"
              className={classes.link}
              variants={socialAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 50, delay: 0.8 }}
            >
              <LinkedIn />
              <span className={classes.text}>/om-gawande</span>
            </motion.a>
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
