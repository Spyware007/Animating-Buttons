import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import classes from "./Login.module.css";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  const handleGitHubLogin = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // Handle successful login
        const user = result.user;
        setUser(user);
        saveUserDataToFirestore(user);
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Handle successful logout
        setUser(null);
      })
      .catch((error) => {
        // Handle logout error
        console.error(error);
      });
  };

  const saveUserDataToFirestore = (user) => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(user.uid)
      .set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
      .then(() => {
        console.log("User data saved in Firestore");
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
  };

  return (
    <div className={classes.container}>
      {user ? (
        <div>
          <img
            src={user.photoURL}
            alt="Profile"
            className={classes.profileImage}
          />
          <h2 className={classes.displayName}>{user.displayName}</h2>
          <button className={classes.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className={classes.loginButton} onClick={handleGitHubLogin}>
          Login with GitHub
        </button>
      )}
    </div>
  );
};

export default Login;
