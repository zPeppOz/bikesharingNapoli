import React from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TopHeader from "../home/components/TopHeader";

export default function MainApp(props) {
  return (
    <>
      <TopHeader>
        <Toolbar>
          <Typography variant="h6" component="div"></Typography>
          <div className="flex-grow" />
          <div className="flex items-center">
            <div className="flex items-center rounded-md bg-white p-2">
              <SearchIcon className="text-gray-500" />
              <InputBase
                placeholder="Cerca..."
                inputProps={{ "aria-label": "cerca" }}
                className="ml-2"
              />
            </div>
          </div>
        </Toolbar>
      </TopHeader>
    </>
  );
}
