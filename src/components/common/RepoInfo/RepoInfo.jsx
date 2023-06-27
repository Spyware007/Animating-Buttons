import React, { useEffect, useState } from "react";
import classes from "./RepoInfo.module.css";
import { motion } from "framer-motion";
import { imgAnim } from "../../Animation/motion";
import { Star, Fork, Contributors } from "../../../assets/svg";

const RepoInfo = () => {
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [contributors, setContributors] = useState(0);

  useEffect(() => {
    const fetchRepoInfo = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Spyware007/Animating-Buttons"
        );
        const data = await response.json();

        setStars(data.stargazers_count);
        setForks(data.forks_count);

        const contributorsUrl = `${data.contributors_url}?per_page=100`; // Fetch 100 contributors per page
        let contributorsData = [];
        let page = 1;

        // Fetch all pages of contributors
        while (true) {
          const contributorsResponse = await fetch(
            `${contributorsUrl}&page=${page}`
          );
          const contributorsPageData = await contributorsResponse.json();

          if (contributorsPageData.length === 0) {
            break; // No more contributors, break the loop
          }

          contributorsData = contributorsData.concat(contributorsPageData);
          page++;
        }

        setContributors(contributorsData.length);
      } catch (error) {
        console.log("Error fetching repository information:", error);
      }
    };

    fetchRepoInfo();
  }, []);

  return (
    <>
      <div className={classes.repo_info}>
        <div className={classes.repo_info_row1}>
          <motion.div
            variants={imgAnim}
            initial="hidden"
            whileInView={{
              scale: [0.9, 1],
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={classes.repo_info_container}
          >
            <Star />
            Stars
            <span className={classes.counter}>{stars}</span>
          </motion.div>
          <motion.div
            variants={imgAnim}
            initial="hidden"
            whileInView={{
              scale: [0.9, 1],
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={classes.repo_info_container}
          >
            <Fork />
            Forks
            <span className={classes.counter}>{forks}</span>
          </motion.div>
        </div>
        <motion.div
          variants={imgAnim}
          initial="hidden"
          whileInView={{
            scale: [0.9, 1],
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={classes.repo_info_container}
        >
          <Contributors />
          Contributors
          <span className={classes.counter}>{contributors}</span>
        </motion.div>
      </div>
    </>
  );
};

export default RepoInfo;
