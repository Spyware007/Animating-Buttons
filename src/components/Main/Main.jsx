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
  return (
    <p onClick={() => redirectToGitHub(d)} className={classes.createdBy}>
      <span className={classes.user}> {d}</span>
    </p>
  );
};

const DownloadBtn = ({ d, modeToggle }) => {
  const displayMode = modeToggle ? classes.dark_mode : classes.light_mode;
  return (
    <div className={`${classes.buttonContainer}`}>
      <Link className={`${classes.copyBtn}  `} to={`/show/${d}`}>
        <button className={`${classes.showcode_btn} ${displayMode}`}>
          Show Code
        </button>
      </Link>
      <button
        onClick={() => downloadFiles(d)}
        className={`${classes.download_btn} ${displayMode}`}
      >
        <i class="fas fa-download"> </i>
        Files
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

  const [query, setQuery] = useState("");

  const filteredItems = Data.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1 className={classes.text}>
        Explore from the list of {Data?.length} Buttons by our Contributors.
      </h1>

      {/* search bar */}
      <div className={classes.bar}>
        <input type="text"
          placeholder="Find Your Perfect Button..."
          className={classes.search}
          onChange={e => setQuery(e.target.value)}
        />
      </div>


      <div className={classes.btns_container}>
        {currentItems
          .filter((d) => d.toLowerCase().includes(query.toLowerCase())).map((d, i) => {
          return (
            <div key={i}>
              <iframe
                className={classes.container}
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
        {filteredItems.length > itemsPerPage && (
          <ul className={classes.paginationList}>
            {Array(Math.ceil(filteredItems.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`${classes.paginationItem} ${currentPage === index + 1 ? classes.active : ""
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