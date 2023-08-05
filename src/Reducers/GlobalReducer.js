export const GlobalReducer = (state, action) => {
    switch (action.type) {
      case "SETBUTTONS":
        console.log("hitting");
        return {
          ...state,
          buttonsData: [...state.buttonsData, ...action.payload],
        };
  
    //   case "SETCHECK":
    //     console.log("reducer payload fro check",action.payload)
    //     return {
    //         ...state,
    //         check: [...state.check, action.payload],
    //     };
  
      default:
        return state;
    }
  };
  