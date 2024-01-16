import { Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../hero.jpg";
import Logo from "../easySharingLogo.png";
import TopHeader from "./components/TopHeader";
import "./css/Home.css";
import { GlobalContext } from "../providers/GlobalContext";

export default function Home() {
  const { loggedUser } = useContext(GlobalContext);

  return (
    <div className="m-0 flex h-screen w-full flex-col bg-[#024059] text-white">
      <TopHeader>
        <div className="flex flex-row items-center justify-end gap-4">
          <Link
            to="/app"
            className="hidden rounded-2xl border-2 border-blue-600 bg-blue-500 px-1 py-2 text-white hover:bg-blue-600 md:block"
          >
            <button className="text-xl">Vai all'app</button>
          </Link>

          {!loggedUser && (
            <>
              <Link to="/Registrati">
                <button className="text-xl">Registrati</button>
              </Link>
              <Link to="/login">
                <button className="rounded-xl border border-transparent bg-[#024059] p-2 text-2xl text-gray-200 hover:opacity-80">
                  Login
                </button>
              </Link>
            </>
          )}
          {loggedUser && (
            <>
              <span className="text-xl">
                Ciao, {loggedUser.nome} {loggedUser.cognome}!
              </span>
            </>
          )}
        </div>
      </TopHeader>

      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-8 py-8 pl-4 md:flex-nowrap md:justify-between md:px-32 md:py-20">
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-5xl font-semibold">EasySharing</h1>
          <p className="mt-4 text-2xl">
            Il futuro del trasporto è qui, e si chiama EasySharing
          </p>
          <Link to="/app">
            <button className="mt-8 rounded-2xl bg-blue-500 px-4 py-2 text-2xl font-bold text-white hover:bg-blue-700">
              Vai all'app
            </button>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center pr-4 md:w-[500px] lg:w-[600px] ">
          <img src={Hero} alt="hero" className="rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
