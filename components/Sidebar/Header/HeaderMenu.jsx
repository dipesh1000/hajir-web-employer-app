"use client";

import React from "react";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";

const HeaderMenu = ({
  onProfileClick,
  onMailClick,
  onLanguageClick,
  onNotificationsClick,
}) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    {/* Messages icon so in later on need to work on this for messaging  */}
    {/* this also was meant to be on design but commented as new ui/ux design  */}
    {/* <MenuItem>
      <IconButton
        size="large"
        aria-label="show 3 new mails"
        color="inherit"
        onClick={onMailClick}
      >
        <Badge badgeContent={99} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
    </MenuItem> */}

    {/* language icon need to have toggle for country  */}

    <MenuItem>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="black"
        onClick={onLanguageClick}
      >
        <Badge badgeContent={"En"} color="info">
          <LanguageIcon />
        </Badge>
      </IconButton>
    </MenuItem>

    {/* Notifications icon so in later on need to work on this for notifications */}
    <MenuItem>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="black"
        onClick={onNotificationsClick}
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </MenuItem>

    {/* this was meant to be profile button but as new ui/ux design there is not this so commenting this  */}
    {/* <MenuItem onClick={onProfileClick}>
      <IconButton
        size="large"
        aria-label="account of current user"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <p>Profile</p>
    </MenuItem> */}
  </div>
);

export default HeaderMenu;
