import React from 'react'
import { auth } from '../../../firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth"; // Import the appropriate hook
import classes from './EditBioBtn.module.css'

const EditBioBtn = ({ userId, handleEditBio }) => {
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
        <div>
            {auth.currentUser &&
                userId === auth?.currentUser?.reloadUserInfo?.screenName && (
                    <div className={classes.edit_button}>
                        <button onClick={handleEditBio}>Edit Bio</button>
                    </div>
                )}
        </div>
    )
}

export default EditBioBtn
