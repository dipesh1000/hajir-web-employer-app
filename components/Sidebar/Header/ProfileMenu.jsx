"use client";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ProfileMenu = ({ anchorEl, onClose }) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    id="primary-search-account-menu"
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={Boolean(anchorEl)}
    onClose={onClose}
  >
    <MenuItem onClick={onClose}>Profile</MenuItem>
    <MenuItem onClick={onClose}>My account</MenuItem>
  </Menu>
);

export default ProfileMenu;
