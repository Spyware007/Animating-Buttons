import React, { useState } from "react";
import classes from "./Main.module.css";
import { Link } from "react-router-dom";
import { Data } from "../../Data";
import download from "../../Functions/Download";

export default function Main({ modeToggle, modeToggleFunc }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Number of items to display per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);

  const isDark = modeToggle ? "dark_mode" : "light_mode";

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <h1 className={classes.text}>Explore the Buttons by our Contributors.</h1>
      <div className={classes.btns_container}>
        {currentItems.map((d, i) => {
          return (
            <div key={i}>
              <iframe
                className={classes.container}
                title={d}
                src={`Buttons/${d}/index.html?c=${isDark}`}
              ></iframe>
              <div className={classes.download}>
                <p>Created by {d}</p>
                <div className={classes.btn_container}>
                  <Link to={`/show/${d}`}>
                    <button
                      type="submit"
                      className={`${classes.mode_toggle} ${
                        modeToggle ? classes.dark_mode : classes.light_mode
                      }`}
                    >
                      Show Code
                    </button>
                  </Link>
                  <button
                    type="submit"
                    onClick={() => download(d)}
                    className={`${classes.mode_toggle} ${
                      modeToggle ? classes.dark_mode : classes.light_mode
                    }`}
                  >
                    Download
                  </button>
                </div>
              </div>
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
