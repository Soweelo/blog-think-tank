import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/Auth/AuthContext";
import { LangContextProvider } from "./context/Lang/LangContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LangContextProvider>
        <App />
      </LangContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
