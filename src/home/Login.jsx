import { LoginRounded } from "@mui/icons-material";
import { FormGroup, TextField, Button } from "@mui/material";
import { TopHeader } from "./components/TopHeader";

export default function LoginPage(props) {
  return (
    <>
      <TopHeader />
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#024059]">
        <div className="relative flex h-2/3 w-2/3 flex-col items-center justify-around border bg-white align-middle shadow-lg  md:h-3/4 md:w-1/3 ">
          <h1 className="text-4xl font-bold">Login</h1>

          <FormGroup className="mt-4 flex flex-col items-center justify-around gap-4 bg-white">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
          </FormGroup>
          <Button variant="contained" startIcon={<LoginRounded />}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
