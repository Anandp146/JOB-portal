// index.js or your top-level component
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MainProvider } from "./main";

ReactDOM.render(
  <MainProvider>
    <App />
  </MainProvider>,
  document.getElementById("root")
);
