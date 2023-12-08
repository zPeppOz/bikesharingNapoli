import { LoginRounded } from "@mui/icons-material";
import { FormGroup, TextField, Button } from "@mui/material";
import { TopHeader } from "./components/TopHeader";

export default function LoginPage(props) {
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
          </FormGroup>
          <Button variant="contained" startIcon={<LoginRounded />}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
