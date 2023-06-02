import { useState, useEffect } from "react";
import { Loader } from "./components";
import MainPage from "./MainPage";
import { BrowserRouter } from "react-router-dom";
import GoToTop from "./components/Top/GoToTop";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return <BrowserRouter>{loading ? <Loader /> : <MainPage />} <GoToTop/> </BrowserRouter>;
};

export default App;
