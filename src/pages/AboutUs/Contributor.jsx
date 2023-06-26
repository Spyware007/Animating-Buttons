import React, { useState, useEffect } from "react";
import classes from "./About.module.css";
import ContributorCard from "./ContributorData";
import axios from "axios";
function Pagination({ data, perPage, currentPage, paginate }) {
  return (
    <>
      <ul className={classes.About_Pagination}>
        {Array.from(
          { length: Math.ceil(data.length / perPage) },
          (_, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                currentPage === index + 1 ? "font-bold" : ""
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </li>
          )
        )}
      </ul>
    </>
  );
}

function Contributor() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(15);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = contributors.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/repos/Spyware007/Animating-Buttons/contributors"
      )
      .then((response) => {
        setContributors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className={classes.About_Contributor}>
        <p className={classes.About_p_o}>Open Source</p>
        <h1 className={classes.About_h1}>Our Valuable Contributors</h1>
        <p className={classes.About_p}>
          {" "}
          Meet the amazing individuals behind our accomplishments.
        </p>
      </div>
      <div className={classes.Contributors_abt}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentUsers.map((contributor, index) => (
              <ContributorCard
                key={index}
                index={index}
                contributor={contributor}
              />
            ))}
            {currentUsers.length === 0 && <p>No contributors found.</p>}
          </>
        )}
      </div>
      {contributors.length > 0 && (
        <Pagination
          data={contributors}
          paginate={paginate}
          perPage={usersPerPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
export default Contributor;
