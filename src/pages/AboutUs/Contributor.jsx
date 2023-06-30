import React from "react";
import classes from "./About.module.css";
import ContributorData from "./ContributorData";
import { fadeIn } from "../../components/Animation/motion";
import { motion } from "framer-motion";

function Contributor() {
  return (
    <div className={classes.Contributor_section}>
      <motion.p variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} transition={{delay : 0.1}} className={classes.About_p_o}>Open Source</motion.p>
      <motion.h1 variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} transition={{delay : 0.2}} className={classes.About_h1}>Our Valuable Contributors</motion.h1>
      <motion.p variants={fadeIn} initial={'hidden'} whileInView={"visible"} viewport={{once : true}} transition={{delay : 0.3}} className={classes.About_p_c}>
        {" "}
        Meet the amazing individuals behind our accomplishments.
      </motion.p>
      <div className={classes.Contributors}>
        {ContributorData.map((card, index) => (
          <motion.div className={classes.card} key={index}
          variants={fadeIn}
          initial={'hidden'}
          whileInView={'visible'}
          viewport={{once : true}}
          transition={{type : 'spring', stiffness : 60, delay : index*0.1}}
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
