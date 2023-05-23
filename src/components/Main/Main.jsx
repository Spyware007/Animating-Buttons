import React, { useState } from "react";
import classes from "./Main.module.css";
import { Link } from "react-router-dom";
import { Data } from "../../Data";
import download from "../../Functions/Download";

export default function Main({ modeToggle, modeToggleFunc }) {
  const toogleMode = modeToggle ? classes.dark_mode : classes.light_mode;

  const redirectToGitHub = (username) => {
    if (window.confirm(`This Will Take You To Github of ${username} ?`)) {
      const url = `https://github.com/${username}`;
      window.open(url, "_blank");
    }
  };

  const DownloadBtn = ({ d, modeToggle }) => {
    return (
      <>
        <p onClick={() => redirectToGitHub(d)} className={classes.createdBy}>
          Created by
          <span className={classes.user}> {d}</span>
        </p>
        <div className={classes.download}>
          <Link to={`/show/${d}`}>
            <button className={`${classes.download_btn} ${toogleMode}`}>
              Show Code
            </button>
          </Link>
          <button
            onClick={() => download(d)}
            className={`${classes.download_btn} ${toogleMode}`}
          >
            Download
          </button>
        </div>
      </>
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Number of items to display per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);

  const isDark = modeToggle ? "dark_mode" : "light_mode";

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const pageNumberComponent = Array(Math.ceil(Data.length / itemsPerPage))
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
    ));

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
              <DownloadBtn d={d} modeToggle={modeToggle} />
            </div>
          );
        })}
      </div>
      <div className={classes.pagination}>
        {Data.length > itemsPerPage && (
          <ul className={classes.paginationList}>{pageNumberComponent}</ul>
        )}
      </div>
    </>
  );
}
