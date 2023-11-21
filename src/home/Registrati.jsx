import { useState, useEffect } from "react";
import { TopHeader } from "./components/TopHeader";
import { FormGroup, TextField, Button } from "@mui/material";

export default function About() {
  const handleRegistration = () => {
    // Implementa la logica di registrazione qui
    console.log("Utente registrato!");
  };

  return (
    <>
      <TopHeader />
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#024059]">
        <div className="relative flex h-2/3 w-2/3 flex-col items-center justify-around border bg-white align-middle shadow-lg md:h-3/4 md:w-1/3">
          <p className="mb-4 text-2xl font-bold text-gray-800">Registrati</p>
          <FormGroup className="mt-4 flex w-8 flex-col items-center justify-around gap-8">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              className="w-full"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              className="w-full"
            />
            <Button
              variant="contained"
              onClick={handleRegistration}
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Registrati
            </Button>
          </FormGroup>
        </div>
      </div>
    </>
  );
}
