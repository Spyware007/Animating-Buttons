import React, { useState, useEffect } from "react";
import "./About.css";
import ContributorCard from "./ContributorData";
import axios from "axios";
function Pagination({ data, perPage, currentPage, paginate }) {
  return (
    <>
      <ul className={"About-Pagination"}>
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
      <div className="About-Contributor">
        <p className="About-p-o">Open Source</p>
        <h1 className="About-h1">Our Valuable Contributors</h1>
        <p className="About-p">
          {" "}
          Meet the amazing individuals behind our accomplishments.
        </p>
      </div>
      <div className="Contributors-abt">
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
