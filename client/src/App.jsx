import React, { useState } from "react";
import { routes } from "./routes/routes";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/Main.layout";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
    updateBodyClass(!isDarkMode);
  }

  function updateBodyClass(isDarkMode) {
    const bodyClass = isDarkMode ? "dark-mode" : "light-mode";
    document.body.className = bodyClass;
  }

  const rootClassName = isDarkMode ? "dark-mode" : "light-mode";
  return (
    <div className={`${rootClassName} App`}>
      <MainLayout toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      <div className="flex-1 md:ml-[20%] mt-14 p-10 overflow-y-auto web">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={React.cloneElement(route.element, { isDarkMode })}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
