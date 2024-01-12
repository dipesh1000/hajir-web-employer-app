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

const CompanySidebar = ({ onLogoutClick }) => {
  const LINKS = [
    // on this home page i want to show the /Dashboard/company/ and the url like id so i can be there
    { text: "Home ", href: "/dashboard/company/", icon: HomeIcon },
    {
      text: "Messenger Indox",
      href: "/dashboard/company/messenger",
      icon: BusinessIcon,
    },
    {
      text: "Payments reports",
      href: "/dashboard/company/paymentsreports",
      icon: StarIcon,
    },
    {
      text: "Missing Attendance",
      href: "dashboard/company/missingattendance",
      icon: ChecklistIcon,
    },
    { text: "Leave", href: "dashboard/company/leave", icon: ChecklistIcon },
    {
      text: "Add approval",
      href: "/dashboard/company/addapproval",
      icon: SettingsIcon,
    },
    {
      text: "Update holiday",
      href: "/dashboard/company/updateholiday",
      icon: SettingsIcon,
    },
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

export default CompanySidebar;
