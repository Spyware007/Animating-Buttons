import React from "react";
import classes from "./Timeline.module.css";

const TimelineItem = ({ data, modeToggle }) => {
  return (
    <div
      className={
        modeToggle
          ? classes.timeline_item
          : `${classes.timeline_item} ${classes.light}`
      }
    >
      <div className={classes.timeline_item_content}>
        <span
          className={classes.tag}
          style={{ background: data.category.color }}
        >
          {data.category.tag}
        </span>
        <time>{data.date}</time>
        <p>{data.text}</p>
        {data.link && (
          <a href={data.link.url} target="_blank" rel="noopener noreferrer">
            {data.link.text}
          </a>
        )}
        <span className={classes.circle} />
      </div>
    </div>
  );
};

export default TimelineItem;
