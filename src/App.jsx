import React, { useState, useEffect, Suspense, lazy } from "react";
import { Loader } from "./components";
import ErrorPage from "./components/ErrorPage/404Error";
import { Routes, Route } from "react-router-dom";
import GoToTop from "./components/Top/GoToTop";
import { Landing, Main, Navbar, Footer } from "./components";
import SuspenseLoader from "./components/SuspenseLoader/SuspenseLoader";
const ShowPage = lazy(() => import("./components/ShowPage/ShowPage"));

const App = ({ modeToggleFunc, modeToggle }) => {
  const [loading, setLoading] = useState(false);
  const [toggleMode, setToggleMode] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${toggleMode ? "dark" : "light"}`}>
          <Navbar modeToggle={toggleMode} modeToggleFunc={setToggleMode} />

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Landing
                    modeToggle={toggleMode}
                    modeToggleFunc={setToggleMode}
                  />
                  {/* <Main
                    modeToggle={toggleMode}
                    modeToggleFunc={setToggleMode}
                  /> */}
                </div>
              }
            />
            <Route
              path={"/show/:id"}
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <ShowPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={<ErrorPage modeToggleFunc={modeToggle} />}
            />
          </Routes>
          <GoToTop />
          <Footer modeToggle={toggleMode} />
        </div>
      )}
    </>
  );
};

export default App;
