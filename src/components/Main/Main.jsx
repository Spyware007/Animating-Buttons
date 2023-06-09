import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Data } from "../../Data";
import classes from "./Main.module.css";
import downloadFiles from "../../Functions/DownloadFiles";
import downloadZip from "../../Functions/DownloadZip";

const redirectToGitHub = (username) => {
  const sure = window.confirm(`This Will Take You To Github of ${username} ?`);
  if (sure) {
    const url = `https://github.com/${username}`;
    window.open(url, "_blank");
  }
};
const CreatedBy = ({ d }) => {
  const realGitHubUsername = d.split("_")[0];
  return (
    <p
      onClick={() => redirectToGitHub(realGitHubUsername)}
      className={`${classes.createdBy}`}
    >
      {d}
    </p>
  );
};

const DownloadBtn = ({ d, modeToggle }) => {
  const displayMode = modeToggle ? classes.dark_mode : classes.light_mode;
  return (
    <div className={`${classes.buttonContainer}`}>
      <button className={`${classes.download_btn} ${displayMode}`}>
        <Link className={`${classes.showcode_btn} `} to={`/show/${d}`}>
          Code
        </Link>
      </button>
      <button
        onClick={() => downloadFiles(d)}
        className={`${classes.download_btn} ${displayMode}`}
      >
        <i class="fas fa-download"> </i>
      </button>
      <button
        onClick={() => downloadZip(d)}
        className={`${classes.download_btn} ${displayMode}`}
      >
        <i class="fas fa-download"> </i>
        Zip
      </button>
    </div>
  );
};

export default function Main({ modeToggle, modeToggleFunc }) {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("current_page")) || 1
  );
  const itemsPerPage = 24; // Number of items to display per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);

  const isDark = modeToggle ? "dark_mode" : "light_mode";

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("current_page", pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const isActive = (i) => (currentPage === i + 1 ? classes.active : "");
  const pageNavigationButtions = (
    <ul className={classes.paginationList}>
      {Array(Math.ceil(Data.length / itemsPerPage))
        .fill()
        .map((_, index) => (
          <li
            key={index}
            className={`${classes.paginationItem} ${isActive(index)}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </li>
        ))}
    </ul>
  );
  const [query, setQuery] = useState("");

  const filteredItems = Data.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {/* <div className={classes.bar}>
        <input
          type="text"
          placeholder="Find Your Perfect Button..."
          className={classes.search}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div> */}
      <h1 style={{ textAlign: "center" }}>
        Total number of Buttons added {Data.length}
      </h1>
      <div className={classes.btns_container}>
        {currentItems
          .filter((d) => d.toLowerCase().includes(query.toLowerCase()))
          .map((d, i) => {
            return (
              <div key={i}>
                <iframe
                  className={classes.iframe_container}
                  title={d}
                  src={`Buttons/${d}/index.html?c=${isDark}`}
                ></iframe>
                <CreatedBy d={d} />
                <DownloadBtn d={d} modeToggle={modeToggle} />
              </div>
            );
          })}
      </div>
      <div className={classes.pagination}>
        {Data.length > itemsPerPage && pageNavigationButtions}
      </div>
    </>
  );
}
