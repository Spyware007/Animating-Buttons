import React from "react";
import { Main, Navbar, Socials, Footer, ShowPage } from "./components";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

export default function MainPage() {
  const [toggleMode, setToggleMode] = useState(false);
  return (
    <>
      <div className={`app ${toggleMode ? "dark" : "light"}`}>
        <Navbar modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Socials modeToggle={toggleMode} />
                <Main modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
              </div>
            }
          />
          <Route path={"/show/:id"} element={<ShowPage />} />
        </Routes>
        <Footer modeToggle={toggleMode} />
      </div>
    </>
  );
}
