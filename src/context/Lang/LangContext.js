import { createContext, useReducer } from "react";
import LangReducer from "../Lang/LangReducer";
const INITIAL_STATE = {
  lang: navigator.language.substr(0, 2),
  isFetching: false,
  error: false,
};

export const LangContext = createContext(INITIAL_STATE);

export const LangContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LangReducer, INITIAL_STATE);
  return (
    <LangContext.Provider
      value={{
        lang: state.lang,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};
