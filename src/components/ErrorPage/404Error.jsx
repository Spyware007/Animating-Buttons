import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./404Errorpage.css";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="pg_not_found">
        <h1 className="error">
          4
          <span>
            <i className="fas fa-ghost"></i>
          </span>
          4
        </h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
        <NavLink to="/">
          <h3 className="btn">
            <i className="bx bx-arrow-back bx-tada bx-flip-horizontal"></i> Go
            Back
          </h3>
        </NavLink>
      </div>

      <Footer />
    </>
  );
};
export default ErrorPage;
