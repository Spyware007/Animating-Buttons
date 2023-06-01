import React from "react";
import classes from "./Socials.module.css";

export default function Socials({ modeToggle }) {
  const toogleMode = modeToggle ? classes.dark_mode : classes.light_mode;
  const iframeSrc = [
    "Buttons/ombhojane-1/index.html",
    "Buttons/ombhojane-2/index.html",
    "Buttons/ombhojane-3/index.html",
    "Buttons/ombhojane-4/index.html",
  ];

  const iFrameComponent = iframeSrc.map((source) => (
    <iframe title={source} className={classes.socials} src={source}></iframe>
  ));

  return (
    <div className={classes.social_container}>
      <h1 className={classes.text}>
        Explore Amazing{" "}
        <span className={`${classes.gradient_bg} ${toogleMode}`}>
          <span className={classes.gradient}>Buttons</span>
        </span>{" "}
        animation <br /> for your next project.
      </h1>
      <p className={classes.para}>An initiative by GDSC-DYPCOE.</p>
      <div className={classes.socials_container}>{iFrameComponent}</div>
    </div>
  );
}
