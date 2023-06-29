import React from "react";
import classes from "./About.module.css";
import ContributorData from "./ContributorData";

function Contributor() {
  return (
    <div className={classes.Contributor_section}>
      <p className={classes.About_p_o}>Open Source</p>
      <h1 className={classes.About_h1}>Our Valuable Contributors</h1>
      <p className={classes.About_p_c}>
        {" "}
        Meet the amazing individuals behind our accomplishments.
      </p>
      <div className={classes.Contributors}>
        {ContributorData.map((card, index) => (
          <div className={classes.card} key={index}>
            <a href={card.githubacc}>
              <img src={card.imageUrl} className={classes.Avtar}></img>
            </a>
            <h3 className={classes.About_h1_c}>{card.head}</h3>
            {/* <h4 className={classes.About_p_c}>{card.para}</h4> */}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Contributor;
<a href="https://oscode-community.github.io/OSCodeCommunitySite/">
  <strong>OSCode</strong>
</a>;
