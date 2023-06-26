import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { db } from "../../firebase/auth";
import axios from "axios";

export const handleGitHubLogin = (setUser) => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  provider.addScope("user:email"); // Request email scope
  provider.addScope("read:user"); // Request user profile scope
  signInWithPopup(auth, provider)
    .then((result) => {
      // Handle successful login
      const user = result.user;
      setUser(user);
    })
    .catch((error) => {
      // Handle login error
      console.error(error);
    });
};

export const handleLogout = (
  setGithubBio,
  setUser,
  setGithubSocialAccounts
) => {
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
export const saveUserDataToFirestore = async (
  bio,
  socialAccounts,
  username,
  profilePictureUrl
) => {
  try {
    const usersCollectionRef = collection(db, "users");

    // Query the collection to find the document with the user's username
    const querySnapshot = await getDocs(
      query(usersCollectionRef, where("githubUsername", "==", username))
    );

    // Check if the document already exists
    if (querySnapshot.size > 0) {
      // Update the existing document
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        bio: bio,
        socials: socialAccounts,
        profilePictureUrl: profilePictureUrl,
      });
      console.log("User data updated in Firestore");
    } else {
      // Create a new document
      const newDocRef = doc(usersCollectionRef); // Automatically generate a new document ID
      const newUser = {
        bio: bio,
        socials: socialAccounts,
        githubUsername: username,
        profilePictureUrl: profilePictureUrl,
      };
      await setDoc(newDocRef, newUser);
      console.log("User data saved to Firestore");
    }
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};


export const fetchGithubData = async (
  user,
  setGithubBio,
  setGithubSocialAccounts
) => {
  //   const githubId = user?.providerData[0]?.uid || user;
  const githubId = user.providerData[0].uid;
  try {
    const response = await axios.get(`https://api.github.com/user/${githubId}`);
    console.log(response);
    const {
      bio,
      blog,
      twitter_username,
      linkedin_username,
      login,
      avatar_url,
    } = response.data;

    setGithubBio(bio);
    const socialAccounts = [];

    if (blog) {
      socialAccounts.push({ name: "Blog", url: blog });
    }

    if (twitter_username) {
      socialAccounts.push({
        name: "Twitter",
        url: `https://twitter.com/${twitter_username}`,
      });
    }

    if (linkedin_username) {
      socialAccounts.push({
        name: "LinkedIn",
        url: `https://linkedin.com/in/${linkedin_username}`,
      });
    }

    setGithubSocialAccounts(socialAccounts);

    saveUserDataToFirestore(bio, socialAccounts, login, avatar_url);
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
  }
};
