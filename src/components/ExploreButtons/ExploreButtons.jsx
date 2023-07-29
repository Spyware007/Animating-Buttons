import React from 'react'
import classes from './ExploreButtons.module.css'

const ExploreButtons = () => {
    return (
        <div className={classes.container}>
            <div class={classes.main}>
                <span class={classes.animated}>C</span>
                <span class={classes.animated}>o</span>
                <span class={classes.animated}>m</span>
                <span class={classes.animated}>m</span>
                <span class={classes.animated}>i</span>
                <span class={classes.animated}>n</span>
                <span class={classes.animated}>g</span>
            </div>

            <div className={classes.main}>
                <span class={classes.animated}>S</span>
                <span class={classes.animated}>o</span>
                <span class={classes.animated}>o</span>
                <span class={classes.animated}>n</span>
            </div>
        </div>

    )
}

export default ExploreButtons
