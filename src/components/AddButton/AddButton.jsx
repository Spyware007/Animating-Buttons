import React, { useState } from "react";
import { db } from "../../firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Import the necessary functions for Firestore
import classes from "./AddButton.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddButton() {
  const [username, setUsername] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [showToaster, setShowToaster] = useState(false); // State variable for toaster visibility
  const [toasterMessage, setToasterMessage] = useState(""); // State variable for toaster message

  const saveCodeToFirestore = async () => {
    if (username === "") {
      // Display failure toast if any of the required fields are empty
      toast.error("Please fill in the github username", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Stop further execution of the function
    }
  
    try {
      const codeDocRef = await addDoc(collection(db, "codes"), {
        username: username,
        html: html,
        css: css,
        js: js,
      });
      console.log("Code saved to Firestore with ID: ", codeDocRef.id);
  
      // Show success toast with combined colors for the progress bar
      toast.success("Saved successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: {
          background: "linear-gradient(to right, black, red)", // Combine black and red colors using a linear gradient
        },
      });
  
      // Clear textarea values
      setUsername("");
      setHtml("");
      setCss("");
      setJs("");
    } catch (error) {
      console.error("Error saving code to Firestore: ", error);
    }
  };
  

  return (
    <div className={classes.container}>
      <div className={classes.input}>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      </div>
      <div className={classes.codeContainer}>
        <textarea
          className={classes.textarea}
          placeholder="HTML code..."
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        ></textarea>
        <textarea
          className={classes.textarea}
          placeholder="CSS code..."
          value={css}
          onChange={(e) => setCss(e.target.value)}
        ></textarea>
        <textarea
          className={classes.textarea}
          placeholder="JS code..."
          value={js}
          onChange={(e) => setJs(e.target.value)}
        ></textarea>
      </div>
      <button className={classes.button} onClick={saveCodeToFirestore}>
        Save Code
      </button>
      <ToastContainer />
    </div>
  );
}

export default AddButton;