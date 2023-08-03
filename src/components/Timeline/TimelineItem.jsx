import React from "react";
import classes from "./Timeline.module.css";
import { motion } from "framer-motion";
import { fadeIn } from "../Animation/motion";

const TimelineItem = ({ data, modeToggle }) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 2, delay: data.delayTime }}
      viewport={{ once: true }}
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
        <time className={classes.date}>{data.date}</time>
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