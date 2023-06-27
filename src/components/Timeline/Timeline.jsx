import { timelineData } from "./timelineData";
import TimelineItem from "./TimelineItem";
import classes from "./Timeline.module.css";

const Timeline = ({ modeToggle }) => {
  return (
    <>
      {timelineData.length > 0 && (
        <div
          className={
            modeToggle
              ? classes.timeline_container
              : `${classes.timeline_container} ${classes.light}`
          }
        >
          {timelineData.map((data, idx) => (
            <TimelineItem data={data} key={idx} />
          ))}
        </div>
      )}
    </>
  );
};
export default Timeline;
