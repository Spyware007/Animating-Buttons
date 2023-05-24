import { useState, useEffect } from "react";
import { Main, Navbar, Socials, Footer, Loader } from "./components";
import Information from "./components/Information/Information";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
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
