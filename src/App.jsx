import { useState } from "react";
import { Main, Navbar, Socials } from "./components";

const App = () => {

  const [toggleMode, setToggleMode] = useState(false)

  return (
    <div className={`app ${toggleMode ? "dark" : "light"}`}>
      <Navbar modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
      <Socials modeToggle={toggleMode} />
      <Main />
    </div>
  );
};

export default App;