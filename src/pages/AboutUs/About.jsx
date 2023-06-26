import React from "react";
import Timeline from "../../components/Timeline/Timeline";

import Contributor from "./Contributor";
import memoji from "../../assets/memoji.png";
import "./About.css";
const About = ({ modeToggle }) => {
  return (
    <>
      <div className="Header">
        <div>
          <img src={memoji} className="admin-img" alt="admin img"></img>
          <h1 className="Admin-name">Om Gawande</h1>
          <p className="Project-Admin">Project Admin</p>
        </div>
        <div className="Para">
          <h1 className="About-h1">About Us</h1>
          <p className="About-p">
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
      <div className="TimeLine-Css">
        <p className="About-p-o">Timeline</p>
        <h1 className="About-h1">Do read my blog</h1>
        <p className="About-p-t">
          {" "}
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <Timeline modeToggle={modeToggle} />
    </>
  );
};

export default About;
