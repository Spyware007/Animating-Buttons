import React from "react";
import "./About.css";
function ContributorCard({ contributor, index }) {
  return (
    <div key={contributor?.id} style={{ width: "11rem" }}>
      <a
        rel="noopener noreferrer"
        href={`https://github.com/${contributor?.login}`}
        aria-label="GitHub"
        className="About-Data"
      >
        <img src={contributor?.avatar_url} alt="avatar" className="Avtar" />
      </a>
      <div className="Counter1">
        <h2 className="Counter2">{contributor?.login}</h2>
        <p className="Counter3">{`Contributions: ${contributor?.contributions}`}</p>
      </div>
    </div>
  );
}

export default ContributorCard;
