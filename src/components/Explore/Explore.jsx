import React, { useState } from "react";
import { Data } from "../../Data";
import classes from "./Explore.module.css";

export default function Explore({ modeToggle, modeToggleFunc }) {
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

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Total number of Buttons added {Data.length}
      </h1>
      <div className={classes.btns_container}>
        {currentItems.map((d, i) => {
          return (
            <>
              <div key={i}>
                <iframe
                  className={classes.iframe_container}
                  title={d}
                  src={`Buttons/${d}/index.html?c=${isDark}`}
                ></iframe>
                <CreatedBy d={d} />
                <DownloadBtn d={d} modeToggle={modeToggle} />
              </div>
            </>
          );
        })}
      </div>
      <div className={classes.pagination}>
        {Data.length > itemsPerPage && pageNavigationButtions}
      </div>
    </>
  );
}
