import React from "react";
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
    <div className={classes.social_container}>
      <div className={`${classes.scontWrapper} ${toogleMode}`}>
        <div className={classes.headingMain}>Animated Buttons</div>
        <div className={classes.subheadingMain}>Explore amazing animated buttons for your next project.</div>
        <div className={classes.lastheadingMain}>An Initiative by GDSC-DYPCOE</div>
        <div className={classes.socials_container}>{iFrameComponent}</div>
      </div>
    </div>
  );
}
