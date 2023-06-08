import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

// images
import spidey from "../../assets/spidey.png";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";

const Navbar = ({ modeToggle, modeToggleFunc }) => {
  return (
    <>
      <nav
        className={`${classes.navbar} ${
          !modeToggle ? classes["navbar-light"] : classes["navbar-dark"]
        }`}
      >
        <ul className={classes.navlist}>
          <li className={classes.list_item}>
            <NavLink className={classes.list_item_link} to="/">
              Home
            </NavLink>
          </li>
          <li className={classes.list_item}>
            <NavLink className={classes.list_item_link} to="/explore">
              Explore
            </NavLink>
          </li>
          <li className={classes.list_item}>
            <NavLink className={classes.list_item_link} to="/about">
              About
            </NavLink>
          </li>
          <button
            className={`${classes.mode_toggle} ${
              modeToggle ? classes.dark_mode : classes.light_mode
            }`}
            onClick={() => modeToggleFunc(!modeToggle)}
          >
            <img src={modeToggle ? sun : moon} alt="" />
          </button>
        </ul>

        <div className={classes.github}>
          <div className={classes.image_container}>
            <img className={classes.image} src={spidey} alt="Creator" />
          </div>
          <span className={classes.username}>Spyware007</span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
