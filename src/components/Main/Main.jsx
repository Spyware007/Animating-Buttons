import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import classes from "./Main.module.css";
import downloadFiles from "../../Functions/DownloadFiles";
import downloadZip from "../../Functions/DownloadZip";

const redirectToGitHub = (username) => {
  const sure = window.confirm(`This will take you to GitHub of ${username}?`);
  if (sure) {
    const url = `https://github.com/${username}`;
    window.open(url, "_blank");
  }
};

const CreatedBy = ({ username }) => {
  return (
    <p onClick={() => redirectToGitHub(username)} className={classes.createdBy}>
      <span className={classes.user}> {username}</span>
    </p>
  );
};

const DownloadBtn = ({ id, modeToggle }) => {
  const displayMode = modeToggle ? classes.dark_mode : classes.light_mode;
  return (
    <div className={`${classes.buttonContainer}`}>
      <button className={`${classes.download_btn} ${displayMode}`}>
        <Link className={`${classes.showcode_btn} `} to={`/show/${id}`}>
          Show Code
        </Link>
      </button>
      <button
        onClick={() => downloadFiles(id)}
        className={`${classes.download_btn} ${displayMode}`}
      >
        <i className="fas fa-download"></i>
        Files
      </button>
      <button
        onClick={() => downloadZip(id)}
        className={`${classes.download_btn} ${displayMode}`}
      >
        <i className="fas fa-download"></i>
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
  const [buttonsData, setButtonsData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "codes"));
        const buttons = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setButtonsData(buttons);
      } catch (error) {
        console.error("Error fetching buttons data: ", error);
      }
    };

    fetchData();
  }, []);

  const fetchCodeFromFirestore = async (id) => {
    const docRef = doc(db, "codes", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { html, css, js } = docSnap.data();
      return { html, css, js };
    } else {
      console.log("No such document!");
      return null;
    }
  };

  useEffect(() => {
    const fetchCode = async (id) => {
      const code = await fetchCodeFromFirestore(id);
      if (code) {
        const { html, css, js } = code;
        setButtonsData((prevData) => {
          const updatedData = [...prevData];
          const index = updatedData.findIndex((button) => button.id === id);
          if (index !== -1) {
            updatedData[index].html = html;
            updatedData[index].css = css;
            updatedData[index].js = js;
          }
          return updatedData;
        });
      }
    };

    buttonsData.forEach((button) => {
      fetchCode(button.id);
    });
  }, [buttonsData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = buttonsData.filter((button) =>
    button.username.toLowerCase().includes(query.toLowerCase())
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const isDark = modeToggle ? "dark_mode" : "light_mode";

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("current_page", pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  return (
    <>
      <div className={classes.fixedButton}>
        <Link to="/add">
          <button className={classes.addButton}>
            <i className="fas fa-plus"></i>
            <span className={classes.buttonText}>Add your button</span>
          </button>
        </Link>
      </div>

      <h1 className={classes.text}>
        Explore from the list of {buttonsData.length} Buttons by our Contributors.
      </h1>

      <div className={classes.bar}>
        <input
          type="text"
          placeholder="Find Your Perfect Button..."
          className={classes.search}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={classes.btns_container}>
        {currentItems.map((button) => (
          <div key={button.id}>
            <iframe
              className={classes.iframe_container}
              title={button.id}
              srcDoc={`<html><body>${button.html}</body><style>${button.css}</style><script>${button.js}</script></html>`}
            ></iframe>

            <CreatedBy username={button.username} />
            <DownloadBtn id={button.id} modeToggle={modeToggle} />
          </div>
        ))}
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
