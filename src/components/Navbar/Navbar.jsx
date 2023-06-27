import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { BsGithub } from "react-icons/bs";

// images
import github from "../../assets/github.png";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";
// import { getAuth } from "firebase/auth";
import axios from "axios";

const Navbar = ({ modeToggle, modeToggleFunc }) => {
  // const auth = getAuth()
  const [username, setUsername] = useState('')
  const [userImage, setUserImage] = useState('')


  // const fetchGithubData = async (user) => {
  //     const githubId = user.providerData[0].uid;
  //     try {
  //       const response = await axios.get(`https://api.github.com/user/${githubId}`);
  //       console.log(response);
  //       const {
  //         login,
  //         avatar_url,
  //       } = response.data;
  //       setUsername(login)
  //       setUserImage(avatar_url)
  //     }
  //     catch (error) {
  //       console.error("Error fetching GitHub data:", error);
  //     }
  // }
  // useEffect(() => {
  //   if (auth.currentUser) {
  //     fetchGithubData(auth.currentUser)
  //   }

  // }, [auth.currentUser])





  return (
    <>
      <nav
        className={`${classes.navbar} ${!modeToggle ? classes["navbar-light"] : classes["navbar-dark"]
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
          {/* <li className={classes.list_item}>
            <Link className={classes.list_item_link} to={"/leaderboard"}>
              Creators
            </Link>
          </li> */}
          <a
            href="https://github.com/Spyware007/Animating-Buttons"
            target="__blank"
            className={classes.image_container_mobile}
          >
            <BsGithub className={classes.image} />
          </a>
          <button
            className={`${classes.mode_toggle} ${modeToggle ? classes.dark_mode : classes.light_mode
              }`}
            onClick={() => modeToggleFunc(!modeToggle)}
          >
            <img src={modeToggle ? sun : moon} alt="" />
          </button>
        </ul>
        <div className={classes.button_container}>
          <NavLink className={classes.list_item_link} to="/add">
            <button className={classes.add}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                ></path>
              </svg>
              <span className={classes.addbtn}>Create</span>
            </button>
          </NavLink>

          {
            username && userImage ?
              (<NavLink className={classes.list_item_link} to={`/user/${username}`}>
                <button className={classes.github}>
                  <div className={classes.image_container}>
                    <img className={classes.image} src={userImage} alt="Creator" />
                  </div>
                  <span className={classes.username}>My Profile</span>
                </button>
              </NavLink>)

              :
              (<NavLink className={classes.list_item_link} to="/login">
                <button className={classes.github}>
                  <div className={classes.image_container}>
                    <BsGithub className={classes.image} />
                  </div>
                  <span className={classes.username}>Sign in With GitHub</span>
                </button>
              </NavLink>)
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
