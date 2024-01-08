// Sidebar.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProfileCard from "./ProfileCard";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutButton from "./LogoutButton";
import BusinessIcon from "@mui/icons-material/Business";
import Link from "next/link";

const Sidebar = ({ onLogoutClick }) => {
  const LINKS = [
    { text: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { text: "Company", href: "/dashboard/company", icon: BusinessIcon },
    { text: "Profile", href: "/dashboard/profile", icon: StarIcon },
    { text: "My Plans", href: "/dashboard/myplans", icon: ChecklistIcon },
    { text: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          top: ["48px", "56px", "64px"],
          height: "auto",
          bottom: 0,
        },
      }}
    >
      <Divider />
      <ProfileCard />
      <List>
        {LINKS.map(({ text, href, icon: Icon }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton component={Link} href={href}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <LogoutButton onClick={onLogoutClick} />
      </List>
    </Drawer>
  );
};

export default Sidebar;
