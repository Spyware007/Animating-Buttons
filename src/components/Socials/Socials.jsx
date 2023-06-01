import React from "react";
import Typewriter from "typewriter-effect";
import classes from "./Socials.module.css";

export default function Socials({ modeToggle }) {
  const toogleMode = modeToggle ? classes.dark_mode : classes.light_mode;
  const iframeSrc = [
    "Buttons/Spyware007/index.html",
    "Buttons/Spyware007_1/index.html",
    "Buttons/Spyware007_2/index.html",
    "Buttons/Spyware007_3/index.html",
  ];

  const iFrameComponent = iframeSrc.map((source) => (
    <iframe title={source} className={classes.socials} src={source}></iframe>
  ));

  return (
    <div className={`${classes.social_container} ${toogleMode}`}>
      <div className={classes.socialHead}>
        <Typewriter onInit={(Typewriter) => {
          Typewriter
            .typeString("Welcome to Open Sourced")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Animated Buttons")
            .start()
        }}>
        </Typewriter>
      </div>

      
      <div className={classes.socialSubhead}>Explore amazing animated buttons for your very next project.</div>
      <p className={classes.para}>An initiative by GDSC-DYPCOE.</p>
      <div className={classes.socials_container}>{iFrameComponent}</div>
    </div>
  );
}
