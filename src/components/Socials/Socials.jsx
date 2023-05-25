import React from "react";
import classes from "./Socials.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
const Socials = ({ modeToggle }) => {
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
        <p className={classes.para}>An initiative by GDSC-DYPCOE. Join our growing community on</p>
        </div>
        
        <div className={classes.socialsection}>
      <div className={classes.socialcard.instagram}  >
        <a href="https://www.instagram.com/gdsc_dypcoe/" target="_blank" rel="noopener noreferrer" className={classes.instagram}>
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <div className={classes.socialcard.instagram}  >
        <a href="https://www.linkedin.com/company/dsc-dypcoe/mycompany/" target="_blank" rel="noopener noreferrer" className={classes.linkedin}>
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className={classes.socialcard.instagram}  >
        <a href="https://twitter.com/GDSC_DYPCOE" target="_blank" rel="noopener noreferrer" className={classes.twitter}>
          <i className="fab fa-twitter"></i>
        </a>
        
      </div>
      <div className={classes.socialcard.instagram}  >
        <a href="https://github.com/DSC-DYPCOE" target="_blank" rel="noopener noreferrer" className={classes.github}>
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
    </>
  );
};

export default Socials;
