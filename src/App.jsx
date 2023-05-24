import { useState, useEffect } from "react";
import { Main, Navbar, Socials, Footer, Loader } from "./components";
import Information from "./components/Information/Information";

const App = () => {
  const [toggleMode, setToggleMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`app ${toggleMode ? "dark" : "light"}`}>
            <Navbar modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
            <Information  modeToggle={toggleMode} />
            <Socials modeToggle={toggleMode} />
            <Main modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
            <Footer modeToggle={toggleMode} />
          </div>
        </>
      )}
    </>
  );
};

export default App;
