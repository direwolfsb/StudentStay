import { createContext, useEffect, useReducer } from "react";

// Initial state definition, checking for user data in localStorage
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Retrieve user from localStorage or set to null
  loading: false, // Indicates whether a request is in progress
  error: null, // Stores any errors that occur during authentication
};

// Creating the AuthContext with the initial state
export const AuthContext = createContext(INITIAL_STATE);

// Reducer function to manage state transitions based on dispatched actions
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START": // Case when login process starts
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS": // Case when login is successful
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE": // Case when login fails
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT": // Case when user logs out
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state; // Default case returns the current state
  }
};

// AuthContextProvider component that wraps around other components to provide authentication state
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); // Setting up reducer with initial state

  // Effect to synchronize state with localStorage whenever the user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); // Storing user data in localStorage
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user, // Current user state
        loading: state.loading, // Loading state
        error: state.error, // Error state
        dispatch, // Dispatch function to trigger state changes
      }}
    >
      {children} {/* Rendering child components */}
    </AuthContext.Provider>
  );
};
