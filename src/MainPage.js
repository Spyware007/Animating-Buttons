import React from "react";
import { Main, Navbar, Socials, Footer, DownloadPage } from "./components";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

export default function MainPage() {
  const [toggleMode, setToggleMode] = useState(false);
  return (
    <>
      <div className={`app ${toggleMode ? "dark" : "light"}`}>
        <Navbar modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
        <Socials modeToggle={toggleMode} />
        <Routes>
          <Route
            path="/"
            element={
              <Main modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
            }
          />
          <Route path="/show" element={<DownloadPage />} />
        </Routes>
        <Footer modeToggle={toggleMode} />
      </div>
    </>
  );
}
