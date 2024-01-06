// LogoutButton.jsx
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = ({ onClick }) => (
  <ListItem disablePadding onClick={onClick}>
    <ListItemButton sx={{ color: "red" }}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </ListItem>
);

export default LogoutButton;
