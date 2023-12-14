import { useState, useEffect } from "react";
import { TopHeader } from "./components/TopHeader";
import { FormGroup, TextField, Button } from "@mui/material";
import { useUsers } from "../hooks/usersHook";
import { useNavigate } from "react-router-dom";

export default function About() {
  const { registerUser } = useUsers();
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    nome: "",
    cognome: "",
    username: "",
    password: "",
  });

  function validate() {
    let isValid = true;
    let newErrors = {
      nome: "",
      cognome: "",
      username: "",
      password: "",
    };

    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = `Inserisci ${key}`;
        isValid = false;
      } else if (key === "password" && form[key].length < 8) {
        newErrors[key] = "La password deve essere lunga almeno 8 caratteri";
        isValid = false;
      }
    });

    setError(newErrors);
    return isValid;
  }

  const navigate = useNavigate();

  const handleRegistration = () => {
    // valida i dati
    if (validate()) {
      registerUser(form);
      alert("Registrazione avvenuta con successo");
      navigate("/app");
    }
  };

  return (
    <div className="h-screen w-full">
      <TopHeader />
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#024059]">
        <div className="relative flex h-fit w-fit  flex-col items-center justify-center gap-4 border bg-white pb-8 pl-4 pr-4 pt-8 align-middle shadow-lg md:h-3/4 md:w-1/3">
          <p className="mb-4 text-2xl font-bold text-gray-800">Registrati</p>

          <FormGroup className="flex flex-col items-center justify-around gap-4">
            <TextField
              id="nome"
              label="Nome"
              variant="outlined"
              style={{
                width: "20rem",
              }}
              value={form.nome}
              onChange={(e) => {
                setForm({ ...form, nome: e.target.value });
              }}
            />
            {error.nome.length > 0 && (
              <p className="-mt-2 text-xs text-red-500">{error.nome}</p>
            )}

            <TextField
              id="cognome"
              label="Cognome"
              type="text"
              variant="outlined"
              style={{
                width: "20rem",
              }}
              onChange={(e) => {
                setForm({ ...form, cognome: e.target.value });
              }}
            />
            {error.cognome.length > 0 && (
              <p className="-mt-2 text-xs text-red-500">{error.cognome}</p>
            )}
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              style={{
                width: "20rem",
              }}
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
            {error.username.length > 0 && (
              <p className="-mt-2 text-xs text-red-500">{error.username}</p>
            )}
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              style={{
                width: "20rem",
              }}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
            {error.password.length > 0 && (
              <p className=" -mt-2 text-xs text-red-500">{error.password}</p>
            )}
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
