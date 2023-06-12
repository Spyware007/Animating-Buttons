import React from "react";
import { useState, useEffect } from "react";
import { Loader } from "./components";
import MainPage from "./MainPage";

const App = ({ modeToggleFunc, modeToggle }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return <>{loading ? <Loader /> : <MainPage modeToggleFunc={modeToggle} />}</>;
};

export default App;
