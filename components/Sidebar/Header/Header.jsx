// Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import ProfileMenu from "./ProfileMenu";
import HeaderMenu from "./HeaderMenu";
import Image from "next/image";

const Header = ({ onMenuIconClick }) => (
  <AppBar position="fixed" elevation={1} color="transparent">
    <Toolbar>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image src="/hajir-logo.png" width={140} height={50} alt="Hajir Logo" />
        {/* Add margin or gap here */}
        <div style={{ marginLeft: "20px" }} />
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
      >
        <Search />
        <HeaderMenu />
      </div>
    </Toolbar>
  </AppBar>
);

export default Header;
