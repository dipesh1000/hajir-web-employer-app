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
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={
            <div
            >
              All
              <span
                style={{
                  backgroundColor: "#22408B",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  marginBottom: "4px",
                  marginRight: "6px",
                  marginLeft: "6px",
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
           
            >
              Active{" "}
              <span
                style={{
                  backgroundColor: "#00800033",
                  color: "#008000",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  marginBottom: "4px",
                  marginRight: "6px",
                  marginLeft: "6px",
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
            // style={{
            //   fontSize: "1rem",
            //   marginBottom: "4px",
            //   marginRight: "6px",
            // }}
            >
              Inactive{" "}
              <span
                style={{
                  backgroundColor: "#FF505033",
                  color: "#FF5050",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  marginBottom: "4px",
                  marginRight: "6px",
                  marginLeft: "6px",
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
