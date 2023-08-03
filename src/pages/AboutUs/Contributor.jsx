import React from "react";
import classes from "./About.module.css";
import ContributorData from "./ContributorData";
import { motion } from "framer-motion";
import { stag } from "../../components/Animation/motion";
import { fadeIn } from "../../components/Animation/motion";

function Contributor() {
  return (
    <div className={classes.Contributor_section}>
      <p className={classes.About_p_o}>Open Source</p>
      <motion.h1
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={classes.About_h1}
      >
        Our Valuable Contributors
      </motion.h1>
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className={classes.About_p_c}
      >
        {" "}
        Meet the amazing individuals behind our accomplishments.
      </motion.p>
      <div className={classes.Contributors}>
        {ContributorData.map((card, i) => (
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
              <img src={card.imageUrl} className={classes.Avtar}></img>
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