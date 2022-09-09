import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LightModeProvider } from "./Context";
import GlobalStyle from "./StyleGlobal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LightModeProvider>
      <GlobalStyle />
      <App />
    </LightModeProvider>
  </React.StrictMode>
);
