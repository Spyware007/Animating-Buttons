import React from 'react'
import classes from './DeleteButton.module.css'


const DeleteButton = ({handleDelete}) => {



    return (
        <div onClick={handleDelete} className={classes.deleteButton}>
            <div className={classes.heartBg}>
                <div
                    className={`${classes.heartIcon} `}
                ></div>
            </div>
        </div>
    )
}

export default DeleteButton
