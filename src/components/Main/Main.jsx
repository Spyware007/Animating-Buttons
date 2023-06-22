import React, { useState, useEffect } from "react";
import { Data } from "../../Data";
import classes from "./Main.module.css";
import Card from "../common/Card/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/auth";

export default function Main({ modeToggle, modeToggleFunc }) {
  const [buttons, setButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("current_page")) || 1
  );

  const itemsPerPage = 36;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const fetchButtons = async () => {
    const buttonsCollection = collection(db, "buttons");
    const querySnapshot = await getDocs(buttonsCollection);
    const buttonsData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, autoid: doc.id };
    });
    return buttonsData;
  };

  useEffect(() => {
    const fetchButtonsData = async () => {
      const fetchedButtons = await fetchButtons();
      setButtons(fetchedButtons);
    };

    fetchButtonsData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("current_page", pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const isActive = (i) => (currentPage === i + 1 ? classes.active : "");
  const [query, setQuery] = useState("");
  const filteredItems = buttons.filter((button) =>
    button.html.toLowerCase().includes(query.toLowerCase())
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
    <div className={classes.main_container}>
      <h1 style={{ textAlign: "center" }}>
        Total number of Buttons added {buttons.length}
      </h1>
      <div className={classes.btns_container}>
        {currentItems.map((button) => (
          <Card key={button.autoid} button={button} autoid={button.autoid} />
        ))}
      </div>
      <div className={classes.pagination}>
        {Data.length > itemsPerPage && pageNavigationButtions}
      </div>
    </div>
  );
}
