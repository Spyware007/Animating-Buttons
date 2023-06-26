import React, { useState, useEffect, Suspense, lazy } from "react";
import ErrorPage from "./components/ErrorPage/404Error";
import { Routes, Route, useLocation } from "react-router-dom";
import GoToTop from "./components/Top/GoToTop";
import {
  Landing,
  Main,
  Loader,
  Login,
  Navbar,
  Footer,
  AddButton,
  Score,
} from "./components";
import SuspenseLoader from "./components/SuspenseLoader/SuspenseLoader";
import UserProfile from "./components/UserProfile/UserProfile";
import About from "./pages/AboutUs/About";
const ShowCode = lazy(() => import("./components/ShowCode/ShowCode"));

const App = ({ modeToggleFunc, modeToggle }) => {
  const [loading, setLoading] = useState(false);
  const [toggleMode, setToggleMode] = useState(true);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const routes = [
    {
      path: "/",
      element: (
        <>
          <Landing modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
          <Main modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
        </>
      ),
    },
    {
      path: "/about",
      element: <About modeToggle={toggleMode} />,
    },
    {
      path: "/show/:id",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <ShowCode />
        </Suspense>
      ),
    },
    {
      path: "/add",
      element: <AddButton />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/user/:userId",
      element: <UserProfile />,
    },
    {
      path: "/leaderboard",
      element: <Score />,
    },
    {
      path: "*",
      element: <ErrorPage modeToggleFunc={modeToggle} />,
    },
  ];

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
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
          <GoToTop />
          <Footer modeToggle={toggleMode} />
        </div>
      )}
    </>
  );
};

export default App;
