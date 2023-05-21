import React from "react";
import classes from "./Main.module.css";
import download from "../../Functions/Download";
import { Data } from "../../Data";

const redirectToGitHub = (username) => {
  const sure = window.confirm(`This Will Take You To Github of ${username} ?`)
  if (sure) {
    const url = `https://github.com/${username}`;
    window.open(url, '_blank'); 
  }
};

const CreatedBy = ({ d }) => {
  return (
    <p 
    onClick={() => redirectToGitHub(d)}
    className={classes.createdBy}>Created by
      <span className={classes.user}>
        {" "}{d}
      </span>
    </p>
  )
}

const DownloadBtn = ({ d , modeToggle}) => {
  return (
    <div className={classes.download}>
      <button
        type="submit"
        onClick={() => {
          download(d);
        }}
        className={`${classes.download_btn} ${modeToggle ? classes.dark_mode : classes.light_mode}`} >
        Download
      </button>
    </div>
  )
}


const Main = ({ modeToggle, modeToggleFunc }) => {
  const isDark = modeToggle ? "dark_mode" : "light_mode";
  return (
    <>
      <h1 className={classes.text}>Explore the Buttons by our Contributors.</h1>
      <div className={classes.btns_container}>
        {Data.map((d, i) => {
          return (
            <div key={i}>
              <iframe
                className={classes.container}
                title={d}
                src={`Buttons/${d}/index.html?c=${isDark}`}
              >

              </iframe>
              <CreatedBy d={d} />
              <DownloadBtn d ={d} modeToggle={modeToggle}/>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Main;
