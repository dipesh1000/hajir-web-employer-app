import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/Inbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import Badge from "@mui/material/Badge";

export default function TabsActiveInactive({
  value,
  handleChange,
  notificationsCount,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab
          label={
            <Badge badgeContent={notificationsCount.all} color="primary">
              <div
                style={{
                  fontSize: "1rem",
                  marginBottom: "4px",
                  marginRight: "6px",
                }}
              >
                All
              </div>
              <InboxIcon />
            </Badge>
          }
          {...a11yProps(0)}
        />
        <Tab
          label={
            <Badge badgeContent={notificationsCount.active} color="secondary">
              <div
                style={{
                  fontSize: "1rem",
                  marginBottom: "4px",
                  marginRight: "6px",
                }}
              >
                Active
              </div>
              <InboxIcon />
            </Badge>
          }
          {...a11yProps(1)}
        />
        <Tab
          label={
            <Badge badgeContent={notificationsCount.inactive} color="info">
              <div
                style={{
                  fontSize: "1rem",
                  marginBottom: "4px",
                  marginRight: "6px",
                }}
              >
                Inactive
              </div>
              <InboxIcon />
            </Badge>
          }
          {...a11yProps(2)}
        />
      </Tabs>
      {/* Your content here */}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
