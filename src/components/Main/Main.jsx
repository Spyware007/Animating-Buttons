import React, { useState } from "react";
import { Data } from "../../Data";
import classes from "./Main.module.css";
import Card from "../common/Card/Card";

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

  const [query, setQuery] = useState("");

  const filteredItems = Data.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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
    <>
      <div className={classes.main_container}>
        <h1 style={{ textAlign: "center" }}>
          Total number of Buttons added {Data.length}
        </h1>
        <div className={classes.btns_container}>
          {currentItems
            .filter((d) => d.toLowerCase().includes(query.toLowerCase()))
            .map((d, i) => (
              <Card key={i} button={d} />
            ))}
        </div>
        <div className={classes.pagination}>
          {Data.length > itemsPerPage && pageNavigationButtions}
        </div>
      </div>
    </>
  );
}
