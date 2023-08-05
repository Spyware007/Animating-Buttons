import React, { createContext, useReducer,useEffect } from "react";
import { GlobalReducer } from "../Reducers/GlobalReducer";

export const GlobalContext = createContext(null);

export  function  GlobalContextProvider({ children }) {
  const initialState = {
    // buttonsData: [],
    // check: [],
    buttonsData: JSON.parse(localStorage.getItem("buttonsData")) || [],
    // check: JSON.parse(localStorage.getItem("check"))||[],
  };



  const [state, dispatch] = useReducer(GlobalReducer, initialState);


  
  useEffect(() => {
    
    localStorage.setItem("buttonsData", JSON.stringify(state.buttonsData));
    //  localStorage.setItem("check", JSON.stringify(state.check));
  }, [state.buttonsData]);


  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
