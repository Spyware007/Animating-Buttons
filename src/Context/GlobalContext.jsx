import React, { createContext, useReducer,useEffect } from "react";
import { GlobalReducer } from "../Reducers/GlobalReducer";

export const GlobalContext = createContext(null);

export function GlobalContextProvider({ children }) {
  const initialState = {
    // buttonsData: [],
    // check: [],
    buttonsData: JSON.parse(localStorage.getItem("buttonsData")) || [],
    check: [],
  };



  const [state, dispatch] = useReducer(GlobalReducer, initialState);


  
  useEffect(() => {
    // Save buttonsData to localStorage whenever it changes
    localStorage.setItem("buttonsData", JSON.stringify(state.buttonsData));
  }, [state.buttonsData]);


  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
