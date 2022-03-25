import { createContext, useEffect, useReducer } from "react";
import UserReducer from "./UserReducer";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  lang:
    JSON.parse(localStorage.getItem("lang")) || navigator.language.substr(0, 2),
  isFetching: false,
  error: false,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    console.log(
      "state user",
      state.user,
      "localStorage.getItem(user)",
      localStorage.getItem("user")
    );
  }, [state.user]);
  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(state.lang));
    console.log("lang", state.lang);
  }, [state.lang]);
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        lang: state.lang,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
