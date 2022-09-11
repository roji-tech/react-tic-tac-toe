import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./App";
import GlobalStyle from "./StyleGlobal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <MainApp />
  </React.StrictMode>
);
