import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { BsGithub } from "react-icons/bs";

import { NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";
import logout from "../../assets/logout-svgrepo-com.svg";
import { handleLogout, handleGitHubLogin } from "./loginHelper";
import { Toaster } from "react-hot-toast";

// images
import github from "../../assets/github.png";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";
import axios from "axios";

const Navbar = ({ modeToggle, modeToggleFunc }) => {
  // const auth = getAuth()
  const [navbarVisible, setNavbarVisible] = useState(true)

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") || ""
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("email") || ""
  );
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("displayName") || ""
  );


  const fetchGithubData = async (githubId) => {
    try {
      const response = await axios.get(
        `https://api.github.com/user/${githubId}`,
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );
      const { login } = response.data;
      setUsername(login);
      localStorage.setItem("username", login);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };


  const handleResize = () => {
    setNavbarVisible(window.innerWidth > 768); 
  };


  useEffect(() => {
    const auth = getAuth();
 // Initial check on component mount
    handleResize();
    window.addEventListener('resize', handleResize);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (!username) {
          try {
            fetchGithubData(auth.currentUser.providerData[0].uid);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        localStorage.clear();
      }

      if (user) {
        // console.log(user);
        localStorage.setItem("displayName", user.displayName);
        localStorage.setItem("username", user?.reloadUserInfo?.screenName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userImage", user.photoURL);

      }
      else {
        handleLogout(setUser);
        localStorage.clear();
      }
      return () => {
        unsubscribe();
      };
    });
    
  }, []);

  return (
    <>
      <nav
        className={`${classes.navbar} ${!modeToggle ? classes["navbar-light"] : classes["navbar-dark"]
          }`}
      >

        <span className={classes.hamburger} onClick={() => setNavbarVisible(true)}>☰</span>

        {navbarVisible && (<div><span className={classes.cross} onClick={() => window.innerWidth < 768 && setNavbarVisible(false)}>✖</span>
          <ul className={classes.navlist}>
            <li className={classes.list_item} onClick={() => window.innerWidth < 768 && setNavbarVisible(false)}>
              <NavLink className={classes.list_item_link}  to="/">
                Home
              </NavLink>
            </li>
            <li className={classes.list_item} onClick={() => window.innerWidth < 768 && setNavbarVisible(false)}>
              <NavLink className={classes.list_item_link} to="/explore">
                Explore
              </NavLink>
            </li>
            <li className={classes.list_item} onClick={() => window.innerWidth < 768 && setNavbarVisible(false)}>
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
              onClick={() => {modeToggleFunc(!modeToggle); window.innerWidth < 768 && setNavbarVisible(false)}}
            >
              <img src={modeToggle ? sun : moon} alt="" />
            </button>
          </ul>
        </div>
        )}

        <div className={classes.button_container}>


          {userImage && userEmail ? (
            <div className={classes.loggedIn}>
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
              <NavLink
                className={classes.list_item_link}
                to={`/user/${user?.reloadUserInfo?.screenName ? user.reloadUserInfo.screenName : localStorage.getItem('username')}`}
              >
                <button className={classes.github}>
                  <div className={classes.image_container}>
                    <img
                      className={classes.image}
                      src={user.photoURL ? user.photoURL : localStorage.getItem('userImage')}
                      alt="Creator"
                    />
                  </div>
                  <span className={classes.username}>My Profile</span>
                </button>
              </NavLink>
              <button className={classes.logOut} onClick={handleLogout}>
                <img
                  src={logout}
                  alt="Log Out"
                  srcset=""
                  height={"20px"}
                  width={"40px"}
                />
              </button>
            </div>
          ) : (
            <div className={classes.list_item_link} onClick={() => handleGitHubLogin(setUser, setGithubBio, setGithubSocialAccounts)}>
              <button className={classes.github}>
                <div className={classes.image_container}>
                  <BsGithub className={classes.image} />
                </div>
                <span className={classes.username}>Sign in With GitHub</span>
              </button>
            </div>
          )}
        </div>
        <Toaster />
      </nav>
    </>
  );
};

export default Navbar;
