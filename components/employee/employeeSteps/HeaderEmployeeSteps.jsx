import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const HeaderEmployeeSteps = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box>
        <Typography variant="h5">Add New Employee</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ marginRight: "8px" }}
          >
            Home
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ marginRight: "8px" }}
          >
            Employee
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ marginLeft: "8px" }}
          >
            New Employee
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderEmployeeSteps;
