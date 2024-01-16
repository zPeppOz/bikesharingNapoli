import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./providers/GlobalContextProvider";
import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <GlobalContextProvider>
      <AppRoutes />
    </GlobalContextProvider>
  </BrowserRouter>
);
