import React, { useState, useEffect } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, signOut, GithubAuthProvider } from "firebase/auth";
import { db } from "../../firebase/auth";
import classes from "./Login.module.css";
import axios from "axios";



const Login = () => {
  const [user, setUser] = useState(null);
  const [githubBio, setGithubBio] = useState("");
  const [githubSocialAccounts, setGithubSocialAccounts] = useState([]);

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchGithubData(user);
      } else {
        setUser(null);
        setGithubBio("");
        setGithubSocialAccounts([]);
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  const fetchGithubData = async (user) => {
    const githubId = user.providerData[0].uid;

    try {
      const response = await axios.get(`https://api.github.com/user/${githubId}`);
      const { bio, blog, twitter_username, linkedin_username, company, location } = response.data;
      setGithubBio(bio);
      const socialAccounts = [];

      if (blog) {
        socialAccounts.push({ name: "Blog", url: blog });
      }

      if (twitter_username) {
        socialAccounts.push({ name: "Twitter", url: `https://twitter.com/${twitter_username}` });
      }

      if (linkedin_username) {
        socialAccounts.push({ name: "LinkedIn", url: `https://linkedin.com/in/${linkedin_username}` });
      }

      if (company) {
        socialAccounts.push({ name: "Company", url: `https://github.com/${company}` });
      }

      if (location) {
        socialAccounts.push({ name: "Location", url: `https://github.com/${location}` });
      }

      setGithubSocialAccounts(socialAccounts);
      saveUserDataToFirestore(bio,socialAccounts)
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  const saveUserDataToFirestore = async (bio, socialAccounts) => {
    try {
      const usersCollectionRef = collection(db, "users");
      const newDocRef = doc(usersCollectionRef); // Automatically generate a new document ID
  
      const newUser = {
        bio: bio,
        socials: socialAccounts,
      };
  
      console.log("User data saving to Firestore...");
      await setDoc(newDocRef, newUser); // Use setDoc with the newDocRef to specify the document ID
      console.log("User data saved to Firestore");
    } catch (error) {
      console.error("Error saving user data to Firestore:", error);
    }
  };

  const handleGitHubLogin = () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    provider.addScope("user:email"); // Request email scope
    provider.addScope("read:user"); // Request user profile scope
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful login
        const user = result.user;
        setUser(user);
        fetchGithubData(user);
        // saveUserDataToFirestore(githubBio, githubSocialAccounts);
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
        // Handle successful logout
        setUser(null);
        setGithubBio("");
        setGithubSocialAccounts([]);
        console.log("Logged out.");
      })
      .catch((error) => {
        // Handle logout error
        console.error(error);
      });
  };

  return (
    <div className={classes.container}>
      {user ? (
        <div>
          <img src={user.photoURL} alt="Profile" className={classes.profileImage} />
          <h2 className={classes.displayName}>{user.displayName}</h2>
          <p className={classes.githubBio}>{githubBio}</p>
          <ul className={classes.socialAccounts}>
            {githubSocialAccounts.map((account, index) => (
              <li key={index}>
                <a href={account.url}>{account.name}</a>
              </li>
            ))}
          </ul>
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