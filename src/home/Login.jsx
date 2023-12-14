import { LoginRounded } from "@mui/icons-material";
import { FormGroup, TextField, Button } from "@mui/material";
import { TopHeader } from "./components/TopHeader";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/usersHook";
import { useState } from "react";

export default function LoginPage(props) {
  const navigate = useNavigate();
  const { loggedUser, loginUser } = useUsers();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  function validate() {
    let isValid = true;
    let newErrors = {
      username: "",
      password: "",
    };

    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = `Inserisci ${key}`;
        isValid = false;
      }
    });

    setError(newErrors);
    return isValid;
  }

  const handleLogin = () => {
    if (validate()) {
      const isLogged = loginUser(form.username, form.password);
      if (isLogged) {
        alert("Login avvenuto con successo");
        navigate("/app");
      } else {
        let newErrors = {
          username: "",
          password: "",
        };
        newErrors.password = "Username o password errati";
        setError(newErrors);
      }
    }
  };

  return (
    <div className=" h-screen w-full">
      <TopHeader />
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#024059]">
        <div className="relative flex h-fit w-fit  flex-col items-center justify-center gap-4 border bg-white pb-8 pl-4 pr-4 pt-8 align-middle shadow-lg md:h-3/4 md:w-1/3">
          {" "}
          <h1 className="text-4xl font-bold">Login</h1>
          <FormGroup className="mt-4 flex flex-col items-center justify-around gap-4">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              style={{
                width: "20rem",
              }}
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
            {error.username && (
              <p className="-mt-2 text-xs text-red-500">{error.username}</p>
            )}
            <TextField
              id="outlined-password-input"
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
            {error.password && (
              <p className="-mt-2 text-xs text-red-500">{error.password}</p>
            )}
          </FormGroup>
          <Button
            variant="contained"
            startIcon={<LoginRounded />}
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
