import React, { useState, useMemo, useCallback } from "react";
import classes from "./Main.module.css";
import Card from "../common/Card/Card";
import { motion } from 'framer-motion'
import { fadeIn, paraAnim } from "../Animation/motion";
import { nextData, getPageNoData } from "../../Server/getButtons";
import { getUsersData } from "../../Server/getUsersData";
import { toast } from "react-hot-toast";

export default function Main({ modeToggle, modeToggleFunc, buttonsData, setButtonsData, totalBtns }) {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("current_page")) || 1
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 9;
  
  // Memoized calculations
  const indexOfLastItem = useMemo(() => currentPage * itemsPerPage, [currentPage]);
  const indexOfFirstItem = useMemo(() => indexOfLastItem - itemsPerPage, [indexOfLastItem]);
  const totalPages = useMemo(() => Math.ceil(totalBtns / itemsPerPage), [totalBtns]);
  
  const isActive = useCallback((pageIndex) => (
    currentPage === pageIndex + 1 ? classes.active : ""
  ), [currentPage]);

  const currentItems = useMemo(() => {
    if (!Array.isArray(buttonsData)) return [];
    return buttonsData.slice(indexOfFirstItem, indexOfLastItem);
  }, [buttonsData, indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = useCallback(async (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let newData = null;
      
      if (pageNumber > currentPage) {
        if (pageNumber - currentPage === 1) {
          newData = await nextData(pageNumber);
        } else {
          newData = await getPageNoData(pageNumber);
        }
        
        if (newData && newData.length > 0) {
          await getUsersData(newData);
          setButtonsData(prevData => [...prevData, ...newData]);
        }
      }
      
      setCurrentPage(pageNumber);
      localStorage.setItem("current_page", pageNumber.toString());
      
      // Smooth scroll to top of buttons section
      setTimeout(() => {
        window.scrollTo({ top: 500, behavior: "smooth" });
      }, 100);
      
    } catch (error) {
      console.error("Error changing page:", error);
      setError("Failed to load page. Please try again.");
      toast.error("Failed to load page");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, totalPages, isLoading, setButtonsData]);

  const pageNavigationButtons = useMemo(() => {
    if (totalPages <= 1) return null;

    return (
      <ul className={classes.paginationList}>
        {/* Previous button */}
        <li
          className={`${classes.paginationItem} ${currentPage === 1 ? classes.disabled : ''}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        >
          {"<"}
        </li>
        
        {/* Page numbers */}
        {Array(totalPages)
          .fill()
          .map((_, index) => {
            const pageNumber = index + 1;
            
            // Show: first page, current page ± 1, last page
            if (
              pageNumber === 1 ||
              pageNumber === currentPage ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) ||
              pageNumber === totalPages
            ) {
              return (
                <li
                  key={pageNumber}
                  className={`${classes.paginationItem} ${isActive(index)} ${isLoading ? classes.loading : ''}`}
                  onClick={() => !isLoading && handlePageChange(pageNumber)}
                  style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                  {pageNumber}
                </li>
              );
            } else if (
              (pageNumber === currentPage - 2 && pageNumber > 1) ||
              (pageNumber === currentPage + 2 && pageNumber < totalPages)
            ) {
              return (
                <li
                  key={`ellipsis-${pageNumber}`}
                  className={`${classes.paginationItem} ${classes.ellipsis}`}
                >
                  ...
                </li>
              );
            }
            return null;
          })}
        
        {/* Next button */}
        <li
          className={`${classes.paginationItem} ${currentPage === totalPages ? classes.disabled : ''}`}
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
        >
          {">"}
        </li>
      </ul>
    );
  }, [totalPages, currentPage, isActive, handlePageChange, isLoading]);

  return (
    <div className={classes.main_container}>
      {error && (
        <div className={classes.error_message}>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      {totalBtns === 0 ? (
        <motion.h1
          variants={paraAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60 }}
          className={classes.wait}
        >
          We Are Constantly Working To Provide You With The Best Possible Experience ...<br /><br />
          Thank You For Your Patience 🫠
        </motion.h1>
      ) : (
        <div>
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            Total number of Buttons added {totalBtns}
          </h1>
          
          {isLoading && (
            <div className={classes.loading_indicator}>
              Loading more buttons...
            </div>
          )}
          
          <div className={classes.btns_container}>
            {currentItems.map((button, index) => (
              <motion.div
                key={`${button.id}-${currentPage}`}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.3 }}
              >
                <Card modeToggle={modeToggle} button={button} />
              </motion.div>
            ))}
          </div>
          
          <div className={classes.pagination}>
            {totalPages > 1 && pageNavigationButtons}
          </div>
        </div>
      )}
    </div>
  );
}