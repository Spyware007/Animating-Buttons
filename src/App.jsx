import { useState, useEffect } from "react";
import { Loader } from "./components";
import MainPage from "./MainPage";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return <BrowserRouter>{loading ? <Loader /> : <MainPage />}</BrowserRouter>;
};

export default App;
