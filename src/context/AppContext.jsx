import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

// Initial state
const initialState = {
  buttonsData: [],
  usersData: [],
  totalBtns: 0,
  currentPage: parseInt(localStorage.getItem("current_page")) || 1,
  isLoading: false,
  error: null,
  theme: {
    mode: true, // true for dark, false for light
  },
  user: null,
  filters: {
    searchQuery: '',
    sortBy: 'likeCounter',
    sortOrder: 'desc'
  }
};

// Action types
export const ActionTypes = {
  SET_BUTTONS_DATA: 'SET_BUTTONS_DATA',
  ADD_BUTTONS_DATA: 'ADD_BUTTONS_DATA',
  SET_USERS_DATA: 'SET_USERS_DATA',
  SET_TOTAL_BUTTONS: 'SET_TOTAL_BUTTONS',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  SET_USER: 'SET_USER',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  RESET_PAGINATION: 'RESET_PAGINATION',
  DELETE_BUTTON: 'DELETE_BUTTON',
  UPDATE_BUTTON_LIKES: 'UPDATE_BUTTON_LIKES',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_BUTTONS_DATA:
      return {
        ...state,
        buttonsData: action.payload,
        error: null
      };

    case ActionTypes.ADD_BUTTONS_DATA:
      return {
        ...state,
        buttonsData: [...state.buttonsData, ...action.payload],
        error: null
      };

    case ActionTypes.SET_USERS_DATA:
      return {
        ...state,
        usersData: action.payload,
        error: null
      };

    case ActionTypes.SET_TOTAL_BUTTONS:
      return {
        ...state,
        totalBtns: action.payload
      };

    case ActionTypes.SET_CURRENT_PAGE:
      localStorage.setItem("current_page", action.payload.toString());
      return {
        ...state,
        currentPage: action.payload
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case ActionTypes.TOGGLE_THEME:
      return {
        ...state,
        theme: {
          ...state.theme,
          mode: !state.theme.mode
        }
      };

    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: {
          ...state.theme,
          mode: action.payload
        }
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case ActionTypes.RESET_PAGINATION:
      localStorage.setItem("current_page", "1");
      return {
        ...state,
        currentPage: 1,
        buttonsData: [],
        error: null
      };

    case ActionTypes.DELETE_BUTTON:
      return {
        ...state,
        buttonsData: state.buttonsData.filter(button => button.id !== action.payload),
        totalBtns: Math.max(0, state.totalBtns - 1)
      };

    case ActionTypes.UPDATE_BUTTON_LIKES:
      return {
        ...state,
        buttonsData: state.buttonsData.map(button =>
          button.id === action.payload.buttonId
            ? { ...button, likeCounter: action.payload.newLikeCount }
            : button
        )
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators with error handling
  const actions = useMemo(() => ({
    setButtonsData: (data) => {
      if (!Array.isArray(data)) {
        console.error('Buttons data must be an array');
        return;
      }
      dispatch({ type: ActionTypes.SET_BUTTONS_DATA, payload: data });
    },

    addButtonsData: (data) => {
      if (!Array.isArray(data)) {
        console.error('Buttons data must be an array');
        return;
      }
      dispatch({ type: ActionTypes.ADD_BUTTONS_DATA, payload: data });
    },

    setUsersData: (data) => {
      if (!Array.isArray(data)) {
        console.error('Users data must be an array');
        return;
      }
      dispatch({ type: ActionTypes.SET_USERS_DATA, payload: data });
    },

    setTotalButtons: (count) => {
      if (typeof count !== 'number' || count < 0) {
        console.error('Total buttons must be a non-negative number');
        return;
      }
      dispatch({ type: ActionTypes.SET_TOTAL_BUTTONS, payload: count });
    },

    setCurrentPage: (page) => {
      if (typeof page !== 'number' || page < 1) {
        console.error('Page must be a positive number');
        return;
      }
      dispatch({ type: ActionTypes.SET_CURRENT_PAGE, payload: page });
    },

    setLoading: (loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: Boolean(loading) });
    },

    setError: (error) => {
      const errorMessage = error?.message || error || 'An unexpected error occurred';
      dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
      toast.error(errorMessage);
    },

    clearError: () => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    },

    toggleTheme: () => {
      dispatch({ type: ActionTypes.TOGGLE_THEME });
    },

    setTheme: (mode) => {
      dispatch({ type: ActionTypes.SET_THEME, payload: Boolean(mode) });
    },

    setUser: (user) => {
      dispatch({ type: ActionTypes.SET_USER, payload: user });
    },

    updateFilters: (filters) => {
      dispatch({ type: ActionTypes.UPDATE_FILTERS, payload: filters });
    },

    resetPagination: () => {
      dispatch({ type: ActionTypes.RESET_PAGINATION });
    },

    deleteButton: (buttonId) => {
      if (!buttonId) {
        console.error('Button ID is required for deletion');
        return;
      }
      dispatch({ type: ActionTypes.DELETE_BUTTON, payload: buttonId });
    },

    updateButtonLikes: (buttonId, newLikeCount) => {
      if (!buttonId || typeof newLikeCount !== 'number') {
        console.error('Valid button ID and like count required');
        return;
      }
      dispatch({ 
        type: ActionTypes.UPDATE_BUTTON_LIKES, 
        payload: { buttonId, newLikeCount } 
      });
    },
  }), []);

  // Memoized context value
  const contextValue = useMemo(() => ({
    ...state,
    actions
  }), [state, actions]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;