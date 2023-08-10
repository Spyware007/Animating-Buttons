import React, { useState } from "react";
import classes from "./Main.module.css";
import Card from "../common/Card/Card";
import { motion } from 'framer-motion'
import { fadeIn, paraAnim } from "../Animation/motion";
import { nextData, getPageNoData } from "../../Server/getButtons";
import { getUsersData } from "../../Server/getUsersData";


export default function Main({ modeToggle, modeToggleFunc, buttonsData, setButtonsData, totalBtns }) {
  // const pageNumber = localStorage.getItem("current_page")
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("current_page")) || 1
  );

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const isActive = (i) => (currentPage === i + 1 ? classes.active : "");

  var currentItems = buttonsData.slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
    )
    
    const handlePageChange = async (pageNumber) => {
      setCurrentPage(pageNumber);
      // if (pageNumber > currentPage) {
        if (pageNumber - currentPage === Math.abs(1)){
        const nextPageData = await nextData(pageNumber)
        const nextPageUsers = await getUsersData(nextPageData)
        if (nextPageData )
        setButtonsData([...buttonsData, ...nextPageData])
    }
    if (pageNumber - currentPage > Math.abs(1)){
      const nextPageData = await getPageNoData(pageNumber)
      const nextPageUsers = await getUsersData(nextPageData)
        if (nextPageData )
        setButtonsData([...buttonsData, ...nextPageData])
      }
      currentItems = buttonsData.slice(
        indexOfLastItem - itemsPerPage,
        indexOfLastItem
    )
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
      {Array(Math.ceil(totalBtns / itemsPerPage))
        .fill()
        .map((_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === currentPage ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) ||
            pageNumber === Math.ceil(totalBtns / itemsPerPage)
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
              pageNumber < Math.ceil(totalBtns / itemsPerPage))
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
          Math.ceil(totalBtns / itemsPerPage) - 1
        )}`}
        onClick={() =>
          handlePageChange(Math.ceil(totalBtns / itemsPerPage))
          // handlePageChange(currentPage+1)
        }
      >
        {">"}
      </li>
    </ul>
  );

  // const RenderItems = async () 
  return (
    <div className={classes.main_container}>


      {(totalBtns === 0) ?

        (<motion.h1
          variants={paraAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60 }}
          className={classes.wait}>We Are Constantly Working To Provide You With The Best Possible Experience ... <br /><br /> Thank You For Your Patience 🫠 </motion.h1>) :

        (<div><h1 style={{ textAlign: "center", marginTop: "30px" }}>
          Total number of Buttons added {totalBtns}
        </h1>
          <div className={classes.btns_container}>
            {
              currentItems && currentItems.map((button, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial={'hidden'}
                  whileInView={'visible'}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.3 }}
                >
                  <Card modeToggle={modeToggle} key={index} button={button} />
                </motion.div>
              ))
            }
          </div>
          <div className={classes.pagination}>
            {totalBtns > itemsPerPage && pageNavigationButtions}
          </div>
        </div>)
      }

    </div>
  );
}
