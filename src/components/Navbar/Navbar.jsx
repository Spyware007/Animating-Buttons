import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import logout from "../../assets/logout-svgrepo-com.svg"

// images
import github from "../../assets/github.png";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";
import { getAuth } from "firebase/auth";
import axios from "axios";

const Navbar = ({ modeToggle, modeToggleFunc }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '')
  const [userImage, setUserImage] = useState(localStorage.getItem('userImage') || '')
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email') || '')
  const [displayName, setDisplayName] = useState(localStorage.getItem('displayName') || '')

  const handleGitHubLogin = async () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    provider.addScope("user:email"); // Request email scope
    provider.addScope("read:user"); // Request user profile scope
    await signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful login
        const user = result.user;
        console.log(user);
        setDisplayName(user.displayName)
        localStorage.setItem("displayName", user.displayName)
        setUserEmail(user.email)
        localStorage.setItem("email", user.email)
        setUserImage(user.photoURL)
        localStorage.setItem("userImage", user.photoURL)
        fetchGithubData(auth.currentUser.providerData[0].uid)
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };


  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setDisplayName('')
        setUsername('')
        setUserEmail('')
        setUserImage('')
        localStorage.setItem("displayName", null)
        localStorage.setItem("email", null)
        localStorage.setItem("userImage", null)
        localStorage.setItem('username', null)
        console.log("Logged out.");
      })
      .catch((error) => {
        console.error(error);
      });
  };




  const fetchGithubData = async (githubId) => {
    try {
      const response = await axios.get(`https://api.github.com/user/${githubId}`, {
      });
      const {
        login,
      } = response.data;
      setUsername(login)
      localStorage.setItem('username', login)
    }
    catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  }


  useEffect(() => {
    if (!(userEmail || userImage || displayName || username)) {
      handleLogout()
    }
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
      } else {
        localStorage.clear()
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
            <img className={classes.image} src={github} alt="Creator" />
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
                width="24"
                height="24"
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
            username && userImage && userEmail ?
              (<div className={classes.loggedIn}>
                <NavLink className={classes.list_item_link} to={`/user/${username}`}>
                  <button className={classes.github}>
                    <div className={classes.image_container}>
                      <img className={classes.image} src={userImage} alt="Creator" />
                    </div>
                    <span className={classes.username}>My Profile</span>
                  </button>

                </NavLink>
                <button className={classes.logOut} onClick={handleLogout}>
                  <img src={logout} alt="Log Out" srcset="" height={'20px'} width={'40px'}/>
                </button>
              </div>)

              :
              (<div className={classes.list_item_link} onClick={handleGitHubLogin}>
                <button className={classes.github}>
                  <div className={classes.image_container}>
                    <img className={classes.image} src={github} alt="Creator" />
                  </div>
                  <span className={classes.username}>Sign in With GitHub</span>
                </button>

              </div>
              )
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
