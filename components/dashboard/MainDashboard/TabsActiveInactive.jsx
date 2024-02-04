import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

export default function TabsActiveInactive({
  value,
  handleChange,
  totalCount,
  activeCount,
  inactiveCount,
}) {
  // console.log("TabsActiveInactive - Total Count:", totalCount);
  // console.log("TabsActiveInactive - Active Count:", activeCount);
  // console.log("TabsActiveInactive - Inactive Count:", inactiveCount);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        centered
      >
        <Tab
          label={
            <div
              style={{
                fontSize: "1rem",
                marginBottom: "4px",
                marginRight: "6px",
              }}
            >
              All
              <span
                style={{
                  color: "white",
                  backgroundColor: "grey",
                  padding: "7px",
                  marginLeft: "5px",
                  // borderRadius: "50%",
                  // fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {totalCount}
              </span>
            </div>
          }
        />
        <Tab
          label={
            <div
              style={{
                fontSize: "1rem",
                marginBottom: "4px",
                marginRight: "6px",
              }}
            >
              Active{" "}
              <span
                style={{
                  color: "white",
                  backgroundColor: "grey",
                  padding: "7px",
                  marginLeft: "5px",
                  // borderRadius: "50%",
                  // fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {activeCount}
              </span>
            </div>
          }
        />
        <Tab
          label={
            <div
              style={{
                fontSize: "1rem",
                marginBottom: "4px",
                marginRight: "6px",
              }}
            >
              Inactive{" "}
              <span
                style={{
                  color: "white",
                  backgroundColor: "grey",
                  padding: "7px",
                  marginLeft: "5px",
                  // borderRadius: "50%",
                  // fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {inactiveCount}
              </span>{" "}
            </div>
          }
        />
      </Tabs>
    </Box>
  );
}
