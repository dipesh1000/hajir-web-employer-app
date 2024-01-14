"use client";
import React, { useState } from "react";
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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const CompanySidebar = ({ onLogoutClick }) => {
  const [openSettings, setOpenSettings] = useState(false);

  const LINKS = [
    { text: "Home", href: "/dashboard/company/", icon: HomeIcon },
    { text: "Employee", href: "/dashboard/employee/", icon: HomeIcon },
    { text: "Attendance", href: "/dashboard/attendance/", icon: HomeIcon },
    { text: "Report", href: "/dashboard/report/", icon: HomeIcon },
    {
      text: "Setting",
      icon: SettingsIcon,
      sublinks: [
        {
          text: "Messenger Inbox",
          href: "/dashboard/company/messenger",
          icon: BusinessIcon,
        },
        {
          text: "Payments Reports",
          href: "/dashboard/company/paymentsreports",
          icon: StarIcon,
        },
        {
          text: "Missing Attendance",
          href: "/dashboard/company/missingattendance",
          icon: ChecklistIcon,
        },
        {
          text: "Leave",
          href: "/dashboard/company/leave",
          icon: ChecklistIcon,
        },
        {
          text: "Add Approval",
          href: "/dashboard/company/addapproval",
          icon: SettingsIcon,
        },
        {
          text: "Update Holiday",
          href: "/dashboard/company/updateholiday",
          icon: SettingsIcon,
        },
      ],
    },
  ];

  const handleSettingsClick = () => {
    setOpenSettings(!openSettings);
  };

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
      <List sx={{ flexGrow: 1 }}>
        {LINKS.map(({ text, href, icon: Icon, sublinks }) => (
          <div key={href || text}>
            <ListItem disablePadding>
              <ListItemButton
                component={href ? Link : undefined}
                href={href}
                onClick={sublinks ? handleSettingsClick : undefined}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
                {sublinks && (openSettings ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {sublinks && sublinks.length > 0 && (
              <Collapse in={openSettings} timeout="auto" unmountOnExit>
                {sublinks.map(({ text, href, icon: SubIcon }) => (
                  <ListItem key={href || text} disablePadding>
                    <ListItemButton
                      component={href ? Link : undefined}
                      href={href}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>
                        <SubIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Collapse>
            )}
          </div>
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
