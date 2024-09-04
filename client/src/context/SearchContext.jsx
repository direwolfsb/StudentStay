import { createContext, useReducer } from "react";

// Initial state definition for search-related data
const INITIAL_STATE = {
  city: undefined, // City selected by the user
  dates: [], // Date range selected by the user
  options: {
    adult: undefined, // Number of adults
    children: undefined, // Number of children
    room: undefined, // Number of rooms
  },
};

// Creating the SearchContext with the initial state
export const SearchContext = createContext(INITIAL_STATE);

// Reducer function to manage state transitions based on dispatched actions
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH": // Case when a new search is initiated
      return action.payload; // Returning the new search data
    case "RESET_SEARCH": // Case when search is reset to initial state
      return INITIAL_STATE; // Resetting to the initial state
    default:
      return state; // Default case returns the current state
  }
};

// SearchContextProvider component that wraps around other components to provide search-related state
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE); // Setting up reducer with initial state

  return (
    <SearchContext.Provider
      value={{
        city: state.city, // Current city in the search
        dates: state.dates, // Current dates in the search
        options: state.options, // Current options (adults, children, rooms) in the search
        dispatch, // Dispatch function to trigger state changes
      }}
    >
      {children} {/* Rendering child components */}
    </SearchContext.Provider>
  );
};
