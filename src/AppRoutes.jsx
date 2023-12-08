import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import About from "./About";
import MainApp from "./app/MainApp";
import Registrazione from "./home/Registrati";
import LoginPage from "./home/Login";
import Dashbord from "./dashboard/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/app" element={<MainApp />} />
      <Route path="/Registrati" element={<Registrazione />} />
      <Route path="/Dash" element={<Dashbord />} />
      {<Route path="/login" element={<LoginPage />} />}
    </Routes>
  );
}

export default AppRoutes;
