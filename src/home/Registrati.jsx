import { useState, useEffect } from "react";
import { TopHeader } from "./components/TopHeader";
import { FormGroup, TextField, Button } from "@mui/material";

export default function About() {
  const handleRegistration = () => {
    // Implementa la logica di registrazione qui
    console.log("Utente registrato!");
  };

  return (
    <div className="h-screen w-full">
      <TopHeader />
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#024059]">
        <div className="relative flex h-fit w-fit  flex-col items-center justify-center gap-4 border bg-white pb-8 pl-4 pr-4 pt-8 align-middle shadow-lg md:h-3/4 md:w-1/3">
          <p className="mb-4 text-2xl font-bold text-gray-800">Registrati</p>

          <FormGroup className="flex flex-col items-center justify-around gap-8">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              style={{
                width: "20rem",
              }}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              style={{
                width: "20rem",
              }}
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
    </div>
  );
}
