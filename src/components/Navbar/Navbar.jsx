import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { BsGithub } from "react-icons/bs";

import { NavLink, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import logout from "../../assets/logout-svgrepo-com.svg";
import { handleLogout, handleGitHubLogin } from "./loginHelper";
import { Toaster } from "react-hot-toast";

// images
import moon from "../../assets/moon.webp";
import sun from "../../assets/sun.webp";

const Navbar = ({ modeToggle, modeToggleFunc }) => {
  const [user, setUser] = useState({ username: "", profilePictureUrl: "" });
  const [githubBio, setGithubBio] = useState("");
  const [githubSocialAccounts, setGithubSocialAccounts] = useState([]);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const location = useLocation();

  const handleResize = () => {
    setNavbarVisible(window.innerWidth > 768);
    if (window.innerWidth > 768) {
      setNavbarVisible(true);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        localStorage.setItem("displayName", user.displayName);
        localStorage.setItem("username", user?.reloadUserInfo?.screenName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userImage", user.photoURL);
      } else {
        // handleLogout(setUser);
        setUser(null);
        localStorage.clear();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <nav
        className={`${classes.navbar} ${
          !modeToggle ? classes["navbar-light"] : classes["navbar-dark"]
        }`}
      >
        <span
          className={classes.hamburger}
          onClick={() => setNavbarVisible(true)}
        >
          ☰
        </span>
        {navbarVisible && (
          <div>
            <span
              className={classes.cross}
              onClick={() => window.innerWidth < 768 && setNavbarVisible(false)}
            >
              ✖
            </span>
            <ul className={classes.navlist}>
              <li
                className={`${classes.list_item} ${
                  location.pathname === "/" && classes.active
                } `}
                onClick={() =>
                  window.innerWidth < 768 && setNavbarVisible(false)
                }
              >
                <NavLink className={classes.list_item_link} to="/">
                  Home
                </NavLink>
              </li>
              <li
                className={`${classes.list_item} ${
                  location.pathname === "/explore" && classes.active
                } `}
                onClick={() =>
                  window.innerWidth < 768 && setNavbarVisible(false)
                }
              >
                <NavLink className={classes.list_item_link} to="/explore">
                  Explore
                </NavLink>
              </li>
              <li
                className={`${classes.list_item} ${
                  location.pathname === "/about" && classes.active
                } `}
                onClick={() =>
                  window.innerWidth < 768 && setNavbarVisible(false)
                }
              >
                <NavLink className={classes.list_item_link} to="/about">
                  About
                </NavLink>
              </li>
              {/* Admin link - only show for admin users */}
              {localStorage.getItem("username")?.toLowerCase() ===
                process.env.REACT_APP_admin_id?.toLowerCase() && (
                <li
                  className={`${classes.list_item} ${
                    location.pathname === "/admin" && classes.active
                  }`}
                  onClick={() =>
                    window.innerWidth < 768 && setNavbarVisible(false)
                  }
                >
                  <NavLink className={classes.list_item_link} to="/admin">
                    Admin
                  </NavLink>
                </li>
              )}
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
                className={`${classes.mode_toggle} ${
                  modeToggle ? classes.dark_mode : classes.light_mode
                }`}
                onClick={() => modeToggleFunc(!modeToggle)}
              >
                <img src={modeToggle ? sun : moon} alt="" loading="lazy" />
              </button>
            </ul>
          </div>
        )}
        <div className={classes.button_container}>
          {user ? (
            <div className={classes.loggedIn}>
              <NavLink className={classes.list_item_link} to="/add">
                <button className={classes.add} title="Create New Button">
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
                to={`/user/${
                  user?.reloadUserInfo?.screenName
                    ? user.reloadUserInfo.screenName
                    : localStorage.getItem("username")
                }`}
              >
                <button className={classes.github}>
                  <div className={classes.image_container}>
                    <img
                      className={classes.image}
                      src={
                        user.photoURL
                          ? user.photoURL
                          : localStorage.getItem("userImage")
                      }
                      alt="Creator"
                      loading="lazy"
                    />
                  </div>
                  <span className={classes.username}>My Profile</span>
                </button>
              </NavLink>
              <button
                className={classes.logOut}
                onClick={() => handleLogout(setUser)}
              >
                <img
                  style={{
                    width: "1rem",
                    height: "1rem",
                    color: "white",
                  }}
                  src={logout}
                  alt="Log Out"
                  height={"20px"}
                  width={"40px"}
                  loading="lazy"
                />
              </button>
            </div>
          ) : (
            <div
              className={`${classes.list_item_link}  ${classes.signInBtn}`}
              onClick={() =>
                handleGitHubLogin(
                  setUser,
                  setGithubBio,
                  setGithubSocialAccounts
                )
              }
            >
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
