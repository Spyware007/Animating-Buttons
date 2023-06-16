import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./404Errorpage.module.css";

const ErrorPage = ({ modeToggle, modeToggleFunc }) => {
  return (
    <>
      <div
        className={`${classes.pg_not_found} ${
          !modeToggle
            ? classes["pg_not_found-dark"]
            : classes["pg_not_found-light"]
        }`}
      >
        <h1 className={classes.error}>
          4
          <span>
            <i className="fas fa-ghost"></i>
          </span>
          4
        </h1>
        <h2 className={classes.heading2}>Error: 404 Button not found</h2>
        <p className={classes.para}>
          Sorry, the page you're looking for cannot be accessed
        </p>
        <NavLink className={classes.goback_link} to="/">
          Go back to homepage
        </NavLink>
      </div>
    </>
  );
};
export default ErrorPage;
