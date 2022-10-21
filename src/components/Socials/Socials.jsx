import React from "react";
import classes from "./Socials.module.css";

const Socials = ({ modeToggle }) => {
  console.log("socials "+ modeToggle)
  return (
    <>
    
      <div className={classes.social_container}>
        <h1 className={classes.text}>
          Explore Amazing{" "}
          <span className={`${classes.gradient_bg} ${modeToggle ? classes.dark_mode : classes.light_mode}`}>
            <span className={classes.gradient}>Buttons</span>
          </span>{" "}
          animation <br /> for your next project.
        </h1>
        <p className={classes.para}>An initiative by GDSC-DYPCOE.</p>
        <div className={classes.socials_container}>
          {/* Add Your Button Below This */}

          <iframe
            className={classes.socials}
            title="abc"
            src="Buttons/Spyware007/index.html"
          ></iframe>
          <iframe
            className={classes.socials}
            title="abc"
            src="Buttons/Spyware007_1/index.html"
          ></iframe>
          <iframe
            className={classes.socials}
            title="abc"
            src="Buttons/Spyware007_2/index.html"
          ></iframe>
          <iframe
            className={classes.socials}
            title="abc"
            src="Buttons/Spyware007_3/index.html"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Socials;
