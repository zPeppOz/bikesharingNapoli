import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../hero.jpg";
import Logo from "../easySharingLogo.png";
import TopHeader from "./components/TopHeader";

export default function Home() {
  return (
    <div className="m-0 flex h-screen w-full flex-col bg-[#024059]  text-white">
      <TopHeader>
        <div className="flex flex-row items-center justify-end gap-4">
          <Link to="/app">
            <button className="text-xl">Vai all'app</button>
          </Link>
          <Link to="/about">
            <button className="text-xl">Chi Siamo</button>
          </Link>
          <Link to="/login">
            <button className="rounded-xl border border-transparent bg-[#024059] p-2 text-2xl text-gray-200 hover:opacity-80">
              Login
            </button>
          </Link>
        </div>
      </TopHeader>

      <main className="container px-32 py-20">
        <div className="flex w-full flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-5xl font-semibold">EasySharing</h1>
            <p className="m t-4 text-2xl">
              Il futuro del trasporto è qui, e si chiama EasySharing
            </p>
            <Link to="/app">
              <button
                className="mt-8 rounded-2xl bg-blue-500 px-4 py-2 text-2xl font-bold text-white hover:bg-blue-700
            "
              >
                Vai all'app
              </button>
            </Link>
          </div>
          <div className="flex flex-row items-end justify-end ">
            <img
              src={Hero}
              alt="hero"
              className="h-[30rem] w-[30rem] rounded-xl object-cover object-center "
            />
          </div>
        </div>
      </main>
    </div>
  );
}
