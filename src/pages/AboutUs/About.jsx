import React from "react";
import Timeline from "../../components/Timeline/Timeline";
import { Twitter, LinkedIn } from "../../assets/svg";
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
          <h1 className={classes.About_h1}>About Us</h1>
          <p className={classes.About_p}>
            Welcome to Amazing Buttons Animation,an initiative by GDSC-DYPCOE for Hacktoberfest. Our website offers a diverse collection of stunning CSS and HTML button animations to enhance your projects. With a focus on engaging user experiences, we provide a range of styles, effects, and transitions to suit any aesthetic.
            <br />
            <br />
            Leading this project is our esteemed Project Admin, Om Gawande. Our buttons are meticulously designed to meet modern standards, ensuring compatibility across browsers and devices. Whether you seek subtle hover effects or dynamic animations, our collection offers abundant choices.
            <br />
            <br />
            We invite you to explore our website and discover the endless possibilities. Whether you're a beginner or an experienced developer, Amazing Buttons Animation has something for everyone.
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
