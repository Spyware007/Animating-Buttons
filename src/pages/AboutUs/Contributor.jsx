import React, { useEffect, useState } from "react";
import classes from "./About.module.css";
import fetchContributorData from "./ContributorData";
import { motion } from "framer-motion";
import { stag } from "../../components/Animation/motion";
import { fadeIn } from "../../components/Animation/motion";

function Contributor() {
  const [contributorData, setContributorData] = useState([]);

  useEffect(() => {
    // Fetch data and update state when the component mounts
    async function fetchData() {
      try {
        const data = await fetchContributorData();
        setContributorData(data);
      } catch (error) {
        // Handle error if needed
      }
    }

    fetchData();
  }, []);

  return (
    <div className={classes.Contributor_section}>
      {/* Rest of your JSX code */}
      <div className={classes.Contributors}>
        {contributorData.map((card, i) => (
          <motion.div
            variants={stag}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.3, delay: i * 0.12 }}
            viewport={{ once: true }}
            className={classes.card}
            key={i}
          >
            <a href={card.githubacc}>
              <img src={card.imageUrl} className={classes.Avtar} alt="Avatar" />
            </a>
            <h3 className={classes.About_h1_c}>{card.head}</h3>
            {/* <h4 className={classes.About_p_c}>{card.para}</h4> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Contributor;
