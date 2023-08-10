import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { getButtonsData } from "./Server/getButtons";
import { getTotalBtns } from "./Server/getButtons";
import { getUsersData } from "./Server/getUsersData";
import {
  AddButton,
  Footer,
  Landing,
  Loader,
  Login,
  Main,
  Navbar,
  Score,
  ExploreButtons
} from "./components";
import ErrorPage from "./components/ErrorPage/404Error";
import SuspenseLoader from "./components/SuspenseLoader/SuspenseLoader";
import GoToTop from "./components/Top/GoToTop";
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

  const [buttonsData, setButtonsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [totalBtns, setTotalBtns] = useState(0)
  useEffect(() => {
    async function fetchData() {
      try {
        const buttonsData = await getButtonsData();
        const usersData = await getUsersData(buttonsData);
        const totalBtns = await getTotalBtns();
        setButtonsData(buttonsData);
        setUsersData(usersData);
        setTotalBtns(totalBtns);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const routes = [
    {
      path: "/",
      element: (
        <>
          <Landing modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
          <Main
            modeToggle={toggleMode}
            modeToggleFunc={setToggleMode}
            buttonsData={buttonsData}
            setButtonsData={setButtonsData}
            totalBtns={totalBtns}
          />
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
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    {
      path: "/user/:userId",
      element: <UserProfile modeToggle={toggleMode} />,
    },
    {
      path: "/leaderboard",
      element: <Score buttonsData={buttonsData} usersData={usersData} />,
    },
    {
      path: "/explore",
      element: <ExploreButtons data={buttonsData} toggleMode={toggleMode} />,
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
    }, 500);
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
