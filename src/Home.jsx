import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="m-0 flex h-screen w-screen flex-col bg-[#a5e6f8]">
      <header className="flex flex-row justify-between border-b-2 border-black bg-slate-600 p-2">
        <p className="text-2xl font-bold text-white">Welcome!</p>
        <ul className="flex flex-row items-end justify-end space-x-4 text-white">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </header>
      <main className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl">Test</p>
          <p className="text-2xl">Test</p>
          <p className="text-2xl">Test</p>
          <p className="text-2xl">Test</p>
          <p className="text-2xl">Test</p>
        </div>
      </main>
    </div>
  );
}
