import React, { useState } from "react";
import classes from "./Main.module.css";
import Card from "../common/Card/Card";
import { motion } from 'framer-motion'
import { fadeIn, paraAnim } from "../Animation/motion";

import { getMoreButtonsData } from "../../Server/getButtons";


export default function Main({ modeToggle, modeToggleFunc, buttonsData,setButtonsData }) {



// const [buttonData,setButtonData]=useState([])
const [check,setCheck]=useState([])
// const [count,setCount]=useState(0)
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("current_page")) || 1
  );
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const isActive = (i) => (currentPage === i + 1 ? classes.active : "");

  const currentItems = buttonsData.slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
  );
  const handlePageChange = async(pageNumber) => {
    setCurrentPage(pageNumber);

    // setCount(count+1)

    // let valid=check.includes(count)

    // if(!valid){
    // }
    setCheck(()=>[...check,pageNumber])
console.log("arrraaayyy---",check)

    
    localStorage.setItem("current_page", pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });

    let pageValid=check.includes(pageNumber)
    if(!pageValid){

      const newButtonsData=await getMoreButtonsData()
      // setButtonData([...buttonData,newButtonsData])
      setButtonsData([...buttonsData,...newButtonsData])
    }
   
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



      {/* <button onClick={()=>getMoreButtonsData()}>more----</button> */}


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
              <motion.div
              key={index}
              variants={fadeIn}
              initial={'hidden'}
              whileInView={'visible'}
              viewport={{once : true}}
              transition={{ duration : 0.5 ,delay : (index%3)*0.3}}
              >
                <Card modeToggle={modeToggle} key={index} button={button} />
              </motion.div>
            ))}
          </div>
          <div className={classes.pagination}>
            {buttonsData.length >= itemsPerPage && pageNavigationButtions}

            {/* <button onClick={()=>handlePageChange()}>Load More</button> */}
          </div>
        </div>)
      }

    </div>
  );
}
