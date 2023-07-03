import React, { useState } from "react";
import classes from "./Main.module.css";
import Card from "../common/Card/Card";
import { motion } from 'framer-motion'
import { paraAnim } from "../Animation/motion";

export default function Main({ modeToggle, modeToggleFunc, buttonsData }) {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("current_page")) || 1
  );
  const itemsPerPage = 36;
  const indexOfLastItem = currentPage * itemsPerPage;
  const isActive = (i) => (currentPage === i + 1 ? classes.active : "");

  const currentItems = buttonsData.slice(
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
      {Array(Math.ceil(buttonsData.length / itemsPerPage))
        .fill()
        .map((_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === currentPage ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) ||
            pageNumber === Math.ceil(buttonsData.length / itemsPerPage)
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
              pageNumber < Math.ceil(buttonsData.length / itemsPerPage))
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
          Math.ceil(buttonsData.length / itemsPerPage) - 1
        )}`}
        onClick={() =>
          handlePageChange(Math.ceil(buttonsData.length / itemsPerPage))
        }
      >
        {">"}
      </li>
    </ul>
  );

  return (
    <div className={classes.main_container}>


      {(buttonsData.length === 0) ?

        (<motion.h1
          variants={paraAnim}
          initial="hidden"
          whileInView="visible"

          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60 }}
          className={classes.wait}>We Are Constantly Working To Provide You With The Best Possible Experience ... <br /><br /> Thank You For Your Patience 🫠 </motion.h1>) :

        (<div><h1 style={{ textAlign: "center", marginTop: "30px" }}>
          Total number of Buttons added {buttonsData.length}
        </h1>
          <div className={classes.btns_container}>
            {currentItems.map((button, index) => (
              <Card modeToggle={modeToggle} key={index} button={button} />
            ))}
          </div>
          <div className={classes.pagination}>
            {buttonsData.length > itemsPerPage && pageNavigationButtions}
          </div>
        </div>)
      }

    </div>
  );
}
