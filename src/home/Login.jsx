import { LoginRounded } from "@mui/icons-material";
import { FormGroup, TextField, Button } from "@mui/material";
import { TopHeader } from "./components/TopHeader";

export default function LoginPage(props) {
  return (
    <div className="container h-screen w-full overflow-y-clip  bg-[#024059]">
      <TopHeader />
      <div className="flex h-full flex-col items-center justify-center px-24 py-8">
        <div className=" flex h-2/3 w-1/5 flex-col items-center justify-around border bg-white shadow-lg  ">
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
    </div>
  );
}
