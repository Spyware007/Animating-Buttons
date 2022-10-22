import { useState } from "react";
import { Main, Navbar, Socials, Footer } from "./components";

const App = () => {
  const [toggleMode, setToggleMode] = useState(false);

  return (
    <div className={`app ${toggleMode ? "dark" : "light"}`}>
      <Navbar modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
      <Socials modeToggle={toggleMode} />
      <Main modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
      <Footer />
    </div>
  );
};

export default App;
