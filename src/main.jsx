import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./providers/GlobalContextProvider";

ReactDOM.render(
  <BrowserRouter>
    <GlobalContextProvider>
      <AppRoutes />
    </GlobalContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
