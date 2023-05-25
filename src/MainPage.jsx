import React, { Suspense, lazy } from "react";
import { Main, Navbar, Socials, Footer } from "./components";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import SuspenseLoader from "./components/SuspenseLoader/SuspenseLoader";
const ShowPage = lazy(() => import("./components/ShowPage/ShowPage"));

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
          <Route path={"/show/:id"} element={
            <Suspense fallback={<SuspenseLoader />}>
              <ShowPage />
            </Suspense>
          } />
        </Routes>
        <Footer modeToggle={toggleMode} />
      </div>
    </>
  );
}
