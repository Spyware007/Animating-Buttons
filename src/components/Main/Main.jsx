import React, { useState } from "react";
import classes from "./Main.module.css";
import { Link } from "react-router-dom";
import { Data } from "../../Data";
import download from "../../Functions/Download";

export default function Main({ modeToggle, modeToggleFunc }) {
  // Function To Redirect User To The Github Of Creator
  const redirectToGitHub = (username) => {
    let githubUsername = username.split("_")[0]; // Extract the base username
    const sure = window.confirm(
      `This Will Take You To GitHub of ${githubUsername} !`
    );
    if (sure) {
      const url = `https://github.com/${githubUsername}`;
      window.open(url, "_blank");
    }
  };

  // Component
  const CreatedBy = ({ d }) => {
    return (
      <p onClick={() => redirectToGitHub(d)} className={classes.createdBy}>
        Created by
        <span className={classes.user}> {d}</span>
      </p>
    );
  };

  // Component
  const DownloadBtn = ({ d, modeToggle }) => {
    return (
      <div className={classes.download}>
        <Link to={`/show/${d}`}>
          <button
            className={`${classes.download_btn} ${
              modeToggle ? classes.dark_mode : classes.light_mode
            }`}
          >
            Show Code
          </button>
        </Link>
        <button
          onClick={() => download(d)}
          className={`${classes.download_btn} ${
            modeToggle ? classes.dark_mode : classes.light_mode
          }`}
        >
          Download
        </button>
      </div>
    );
  };

  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem("current_page")) || 1);
  const itemsPerPage = 24; // Number of items to display per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);

  const isDark = modeToggle ? "dark_mode" : "light_mode";

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("current_page", pageNumber)
    window.scrollTo({ top: 500, behavior: "smooth" });

  };
  return (
    <>
      <h1 className={classes.text}>
        Explore from the list of {Data?.length} Buttons by our Contributors.
      </h1>
      <div className={classes.btns_container}>
        {currentItems.map((d, i) => {
          return (
            <div key={i}>
              <iframe
                className={classes.container}
                title={d}
                src={`Buttons/${d}/index.html?c=${isDark}`}
              ></iframe>
              <CreatedBy d={d} />
              <></>
              <DownloadBtn d={d} modeToggle={modeToggle} />
            </div>
          );
        })}
      </div>
      <div className={classes.pagination}>
        {Data.length > itemsPerPage && (
          <ul className={classes.paginationList}>
            {Array(Math.ceil(Data.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`${classes.paginationItem} ${
                    currentPage === index + 1 ? classes.active : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}
