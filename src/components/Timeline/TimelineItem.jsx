import React from "react";
import classes from "./Timeline.module.css";
import { motion } from "framer-motion";
import { leftAnim, rightAnim } from "../Animation/motion";

const TimelineItem = ({ data, modeToggle, index }) => {
  console.log(index);
  return (
    <motion.div
      variants={(index % 2) === 0 ? rightAnim : leftAnim}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 60 }}
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
          <a
            href={data.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            {data.link.text}
          </a>
        )}
        <span className={classes.circle} />
      </div>
    </motion.div>
  );
};

export default TimelineItem;
