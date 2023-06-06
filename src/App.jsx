import React from "react";
import { useState, useEffect } from "react";
import { Loader } from "./components";
import MainPage from "./MainPage";
import ErrorPage from './components/ErrorPage/404Error'
import { BrowserRouter, Routes,Route } from "react-router-dom";
import GoToTop from "./components/Top/GoToTop";



const App = ({ modeToggleFunc,modeToggle }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);



  return <>

 <Routes >
  <Route path="/" element={loading ? <Loader /> : <MainPage modeToggleFunc={modeToggle}  />} />
  <Route path="*" element={<ErrorPage modeToggleFunc={modeToggle}/>} />
 </Routes>
  </>;

  return <BrowserRouter>{loading ? <Loader /> : <MainPage />} <GoToTop/> </BrowserRouter>;

  return (
    <>
      {loading ? <Loader /> : <MainPage />} <GoToTop />{" "}
    </>
  );

};

export default App;
