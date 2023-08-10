import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth"; // Import the appropriate hook
import { auth } from "../../../firebase/auth";
import classes from './Editbtn.module.css'
import './edit-svgrepo-com.svg'
import { useLocation } from "react-router-dom";


const EditbtnBtn = ({ modeToggle, handleDelete }) => {
  const location = useLocation();

    const [user, loading, error] = useAuthState(auth); // Use the useAuthState hook
    if (loading) {
        return null; // Return nothing while authentication state is loading
    }

    if (error) {
        // Handle authentication error if needed
        console.error("Authentication error:", error);
        return null;
    }

    if (!user) {
        return null; // Return nothing if the user is not logged in
    }
    return (
        auth.currentUser &&
        location.pathname.split("/")[2] ===
        auth?.currentUser?.reloadUserInfo?.screenName && (
            <div
                onClick={handleDelete}
                className={`${classes.deleteButton} ${modeToggle ? classes["dark"] : classes["light"]
                    }`}
            >
                <div className={classes.heartBg}>
                    <div className={`${classes.heartIcon} `}></div>
                </div>
            </div>
        )
    )
}

export default EditbtnBtn
