import React, { useState } from "react";
import { Data } from "../../Data";
import classes from "./Main.module.css";
import Card from "../common/Card/Card";

export default function Main({ modeToggle, modeToggleFunc, buttonsData }) {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("current_page")) || 1
  );
  const itemsPerPage = 36;
  const indexOfLastItem = currentPage * itemsPerPage;
  const isActive = (i) => (currentPage === i + 1 ? classes.active : "");
  const [query, setQuery] = useState("");
  const filteredItems = buttonsData.filter((button) =>
    button.html.toLowerCase().includes(query.toLowerCase())
  );
  const currentItems = filteredItems.slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("current_page", pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const pageNavigationButtions = (
    <ul className={classes.paginationList}>
      <li
        className={`${classes.paginationItem} ${isActive(0)}`}
        onClick={() => handlePageChange(1)}
      >
        {"<"}
      </li>
      {Array(Math.ceil(filteredItems.length / itemsPerPage))
        .fill()
        .map((_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === currentPage ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) ||
            pageNumber === Math.ceil(filteredItems.length / itemsPerPage)
          ) {
            return (
              <li
                key={index}
                className={`${classes.paginationItem} ${isActive(index)}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          } else if (
            (pageNumber === currentPage - 2 && pageNumber > 1) ||
            (pageNumber === currentPage + 2 &&
              pageNumber < Math.ceil(filteredItems.length / itemsPerPage))
          ) {
            return (
              <li
                key={index}
                className={`${classes.paginationItem} ${classes.ellipsis}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                ...
              </li>
            );
          }
          return null;
        })}
      <li
        className={`${classes.paginationItem} ${isActive(
          Math.ceil(filteredItems.length / itemsPerPage) - 1
        )}`}
        onClick={() =>
          handlePageChange(Math.ceil(filteredItems.length / itemsPerPage))
        }
      >
        {">"}
      </li>
    </ul>
  );

  return (
    <div className={classes.main_container}>
      <h1 style={{ textAlign: "center" }}>
        Total number of Buttons added {buttonsData.length}
      </h1>
      <div className={classes.btns_container}>
        {currentItems.map((button, index) => (
          <Card key={index} button={button} />
        ))}
      </div>
      <div className={classes.pagination}>
        {Data.length > itemsPerPage && pageNavigationButtions}
      </div>
    </div>
  );
}
